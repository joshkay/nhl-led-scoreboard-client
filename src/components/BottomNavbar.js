import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link, withRouter } from 'react-router-dom';

const useStyles = createUseStyles({
  navbar: {
    overflow: 'hidden',
    position: 'fixed',
    bottom: 0,
    width: '100%'
  }
});

const BottomNavbar = ({ items }) =>
{
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      {
        items.map(({path, name}) => (
          <Link
            to={path}
          >
            {name}
          </Link>
        ))
      }
    </nav>
  );
}

export default withRouter(BottomNavbar);