import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: 200,
    height: 200
  },
  logo: {
    width: 200,
    height: 200
  }
});

const Team = ({className, mostRecentTeamId, fullName, teams}) =>
{
  const classes = useStyles();
  const [activeTeam, setActiveTeam] = useState();
  const [logoNumber, setLogoNumber] = useState(0);

  useEffect(() =>
  {
    if (teams)
    {
      setActiveTeam(teams.find(({id, active}) => active === 'Y' && id === mostRecentTeamId));
    }
  }, [mostRecentTeamId, teams]);

  useEffect(() =>
  {
    const rotateLogos = async () =>
    {
      let currentNumber = 0;
      setInterval(() => {
        currentNumber = (currentNumber + 1) >= activeTeam.logos.length ? 0 : currentNumber + 1
        setLogoNumber(currentNumber);
      }, 1000);
    }

    if (activeTeam !== undefined)
    {
      rotateLogos();
    }
  }, [activeTeam]);

  const setTeam = () => 
  {
    fetch(`${process.env.REACT_APP_API_URL}/team/${mostRecentTeamId}`, {method: 'PUT'});
  };

  if (activeTeam === undefined)
  {
    return null;
  }

  return (
    <div className={className}>
      <div className={classes.container} onClick={setTeam}>
        {
          // activeTeam.logos.map(({secureUrl}) => (
          //   <img className={classes.logo} src={secureUrl} />
          // ))
          <img className={classes.logo} 
            alt={`${activeTeam.fullName} Team Logo`} 
            src={activeTeam.logos[logoNumber].secureUrl} />
        }
        {activeTeam.fullName}
      </div>
    </div>
  );
}

export default Team;