import React, { useState, useEffect, useContext } from 'react';
import NHLApiContext from '../../context/NHLApiContext';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    paddingBottom: 35,
    overflow: 'auto',
    display: 'flex'
  },
  logo: {
    width: 200,
    height: 200
  }
});

const TeamConfig = ({ teamCommonName, onClick }) =>
{
  const classes = useStyles();

  const {
    data: teams 
  } = useContext(NHLApiContext);

  const [team, setTeam] = useState();
  const [activeTeam, setActiveTeam] = useState();
  
  useEffect(() => {
    if (teams && teams.length)
    {
      const team = teams.find((team) => (
        team.teamCommonName.toLowerCase() === teamCommonName
      ));
      setTeam(team);
    }
  }, [teamCommonName, teams]);

  // useEffect(() =>
  // {
  //   const { mostRecentTeamId, teams } = team;

  //   setActiveTeam(teams.find(({id}) => (
  //     id === mostRecentTeamId
  //   )));
  // }, [team]);
  
  return (
    <div className={classes.container} onClick={onClick}>
      {activeTeam && activeTeam.fullName}
      {
        team && team.teams.map(({logos}) => (
          logos.map(({secureUrl}, index) => (
            <img key={index} 
              className={classes.logo} 
              alt={activeTeam !== undefined ? 
                `${activeTeam.fullName} Team Logo` : 
                'Team Logo'
              } 
              src={secureUrl} 
            />
          ))
        ))
      }
    </div>
  );
}

export default TeamConfig;