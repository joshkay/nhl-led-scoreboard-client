import React from 'react';
import BrightnessSlider from './components/BrightnessSlider';
import TeamList from './components/TeamList';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  app: {
    // backgroundColor: "#282c34",
    paddingBottom: 35,
    color: 'white',
    fontSize: 20,
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }
});

const App = () => 
{
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <BrightnessSlider />
      <TeamList />
    </div>
  );
}

export default App;
