import React from 'react';
import TeamList from './components/TeamList';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  app: {
    // backgroundColor: "#282c34",
    paddingBottom: 35,
    color: 'white',
    fontSize: 20,
  }
});

const App = () => 
{
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <TeamList />
    </div>
  );
}

export default App;
