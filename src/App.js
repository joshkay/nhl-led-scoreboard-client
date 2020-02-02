import React from 'react';
import { createUseStyles } from 'react-jss';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import BottomNavbar from './components/BottomNavbar';
import ConfigPage from './pages/ConfigPage';
import TeamSettingsPage from './pages/TeamSettingsPage';
import NotFoundPage from './pages/NotFoundPage';

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

const NAVBAR_ITEMS = [
  {
    name: 'Teams',
    path: '/teams',
    component: TeamSettingsPage
  },
  {
    name: 'Config',
    path: '/config',
    component: ConfigPage
  }
] 

const App = () => 
{
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Switch>
          {
            NAVBAR_ITEMS.map(({path, component}) => (
              <Route key={path} exact path={path} component={component} />
            ))
          }
          <Route component={NotFoundPage} />
        </Switch>
        <BottomNavbar items={NAVBAR_ITEMS} />
      </BrowserRouter>
    </div>
  );
}

export default App;
