import React, { useState, useEffect } from 'react';
import Team from './Team';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  teamContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    '&:after': {
     content: '""',
     flex: 'auto'
    }
  },
  empty: {
    width: 200,
    height: 0
  },
  team: {
    //display: 'inline-block'
  }
});

const TeamList = ({name}) =>
{
  const classes = useStyles();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      try 
      {
        const res = await fetch("https://cors-anywhere.herokuapp.com/https://records.nhl.com/site/api/franchise?include=teams.id&include=teams.active&include=teams.triCode&include=teams.placeName&include=teams.commonName&include=teams.fullName&include=teams.logos&include=teams.conference.name&include=teams.division.name&include=teams.franchiseTeam.firstSeason.id&include=teams.franchiseTeam.lastSeason.id&include=teams.franchiseTeam.teamCommonName");

        const { data } = await res.json();
          
        setLoading(false);
        setTeams(data);
      }
      catch (error)
      {
        setLoading(false);
        setError(error);
      }
    }

    fetchData();

  }, []);

  if (loading)
  {
    return (
      <div>
        Loading
      </div>
    );
  }

  if (error)
  {
    return (
      <div>
        {error}
      </div>
    )
  }

  return (
    <div className={classes.teamContainer}>
      {
        teams.map(team => (
          <Team className={classes.team} key={team.id} {...team} />
        ))
      }
      {
        teams.map(() => (
          <div className={classes.empty}></div>
        ))
      }
    </div>
  )
}

export default TeamList;