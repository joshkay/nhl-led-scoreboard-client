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

const TeamConfig = ({ activeTeam }) =>
{
  const classes = useStyles();
  
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

export default TeamConfig;