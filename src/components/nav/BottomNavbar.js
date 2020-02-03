import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link, withRouter } from 'react-router-dom';

const useStyles = createUseStyles({
  navbar: {
    overflow: 'hidden',
    //position: 'fixed',
    //bottom: 0,
    marginTop: 'auto',
    width: '100%',
    backgroundColor: 'white',
    height: 100
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0
  },
  listItem: {
    flex: '1 1 auto',
    '& + $listItem': {
      borderLeft: 'solid 5px black'
    },
    height: '100%',
    textAlign: 'center'
  },
  link: {
    fontSize: 30,
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'black',
    width: '100%',
    height: '100%',
    display: 'block',
    lineHeight: '100px'
  }
});

const BottomNavbar = ({ items }) =>
{
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      <ul className={classes.list}>
      {
        items.map(({path, name}) => (
          <li key={path} className={classes.listItem}>
            <Link to={path} className={classes.link}>
              {name}
            </Link>
          </li>
        ))
      }
      </ul>
    </nav>
  );
}

export default withRouter(BottomNavbar);