import React from 'react';
import { createUseStyles } from 'react-jss';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import BottomNavbar from './components/nav/BottomNavbar';
import ConfigPage from './pages/ConfigPage';
import TeamSettingsPage from './pages/TeamSettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import { NHLApiProvider } from './context/NHLApiContext';
import LEDApiContext from './context/LEDApiContext';

const useStyles = createUseStyles({
  app: {
    // backgroundColor: "#282c34",
    color: 'white',
    fontSize: 20,
  },
  container: {
    display: 'flex',
    height: '100vh',
    minHeight: '100vh',
    maxHeight: '100vh',
    width: '100%',
    flexDirection: 'column',
    '& main': {
      flex: 1,
      overflow: 'auto'
    }
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
      <LEDApiContext.Provider>
        <NHLApiProvider>
          <BrowserRouter>
            <div className={classes.container}>
              <main>
                <Switch>
                  {
                    NAVBAR_ITEMS.map(({path, component}) => (
                      <Route key={path} exact path={path} component={component} />
                    ))
                  }
                  <Route component={NotFoundPage} />
                </Switch>
              </main>
              <BottomNavbar items={NAVBAR_ITEMS} />
            </div>
          </BrowserRouter>
        </NHLApiProvider>
      </LEDApiContext.Provider>
    </div>
  );
}

export default App;
