import React from 'react';
import TeamConfig from '../components/teams/TeamConfig';

const TeamConfigPage = ({ match }) => 
(
  <React.Fragment>
    <TeamConfig teamCommonName={match.params.name} />
  </React.Fragment>
);

export default TeamConfigPage;