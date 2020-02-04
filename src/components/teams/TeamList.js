import React, { useState, useEffect, useContext } from 'react';
import Team from './Team';
import { createUseStyles } from 'react-jss';
import NHLApiContext from '../../context/NHLApiContext';

const useStyles = createUseStyles({
  teamContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingBottom: 35,
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

const TeamList = ({name, onClick}) =>
{
  const classes = useStyles();
  
  const {
    loading,
    error,
    data: teams 
  } = useContext(NHLApiContext);

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
        teams.length && teams.map(team => (
          <Team className={classes.team} 
            key={team.id} 
            team={team}
            onClick={onClick}
          />
        ))
      }
      {
        teams.length && teams.map((team, index) => (
          <div key={`ghost${team.id}}`} className={classes.empty}></div>
        ))
      }
    </div>
  )
}

export default TeamList;