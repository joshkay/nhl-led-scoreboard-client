import React, { useState } from 'react';
import TeamList from './TeamList';
import { Redirect } from 'react-router-dom';

const TeamSettings = () => 
{
  const [team, setTeam] = useState();

  const onClick = (team) =>
  {
    setTeam(team);
  };

  if (team)
  {
    return <Redirect to={`/team/${team.teamCommonName.toLowerCase()}`} />
  }

  return <TeamList onClick={onClick} />;
};

export default TeamSettings;