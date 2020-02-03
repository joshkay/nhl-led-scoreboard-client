import React from 'react';
import TeamList from './TeamList';

const TeamSettings = () => 
{
  const onClick = (team) =>
  {
    console.log(team)
  };

  return (
    <React.Fragment>
      <TeamList onClick={onClick} />
    </React.Fragment>
  );
};

export default TeamSettings;