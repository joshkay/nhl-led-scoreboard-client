import React from 'react';
import BrightnessSlider from '../components/config/BrightnessSlider';
import TeamList from '../components/teams/TeamList';

const ConfigPage = () => (
  <React.Fragment>
    <BrightnessSlider />
    <TeamList />
  </React.Fragment>
);

export default ConfigPage;