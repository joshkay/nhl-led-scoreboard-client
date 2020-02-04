import React, { useState, useEffect, useRef, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import LEDApiContext from '../../context/LEDApiContext';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: 200,
    height: 200,
    '& img': {
      WebkitTouchCallout: 'none !important', 
      WebkitUserSelect: 'none !important'
    }
    
  },
  logo: {
    width: 200,
    height: 200
  },
  backgroundStar: {
    fontSize: 35,
    position: 'absolute',
    left: 0,
    color: '#282c34',
    width: 35,
    height: 35,
    lineHeight: '30px'
  },
  star: {
    fontSize: 25,
    position: 'absolute',
    left: 0,
    width: 35,
    height: 35,
    lineHeight: '30px'
  },
  starContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 35,
    height: 35,
    lineHeight: '30px'
  }
});

const Team = ({
  team,
  className, rotateLogos, onClick
}) =>
{
  const { mostRecentTeamId, teams } = team;
  
  const {
    data: settings
  } = useContext(LEDApiContext);

  const timerRef = useRef(null);

  const classes = useStyles();
  const [favourite, setFavourite] = useState(false);
  const [activeTeam, setActiveTeam] = useState();
  const [logoNumber, setLogoNumber] = useState(0);
  const [holding, setHolding] = useState(false);

  useEffect(() =>
  {
    const favTeams = settings.preferences.teams;
    if (favTeams.includes(team.teamCommonName))
    {
      setFavourite(true);
    }
  }, [settings, teams]);

  useEffect(() =>
  {
    if (teams)
    {
      setActiveTeam(teams.find(({id, active}) => active === 'Y' && id === mostRecentTeamId));
    }
  }, [mostRecentTeamId, teams]);

  useEffect(() =>
  {
    let interval;
    if (rotateLogos)
    {
      const rotateLogos = async () =>
      {
        let currentNumber = 0;
        interval = setInterval(() => {
          currentNumber = (currentNumber + 1) >= activeTeam.logos.length ? 0 : currentNumber + 1
          setLogoNumber(currentNumber);
        }, 1000);
      }

      if (activeTeam !== undefined)
      {
        rotateLogos();
      }
    }

    return () => clearInterval(interval);
    
  }, [activeTeam, rotateLogos]);

  const setTeam = () => 
  {
    fetch(`${process.env.REACT_APP_API_URL}/team/${mostRecentTeamId}`, {method: 'PUT'});
  };

  if (activeTeam === undefined)
  {
    return null;
  }

  const handleButtonPress = (e) => 
  {
    console.log(e.nativeEvent)
    if ((e.nativeEvent.which === 1 && e.nativeEvent.type === 'mousedown') ||
        e.nativeEvent.type === 'touchstart')
    {
      timerRef.current = setTimeout(() => {
        setFavourite(!favourite);
        timerRef.current = undefined;
        setHolding(true);
      }, 500);
    }
  }

  const handleButtonRelease = (e) => 
  {
    if (timerRef.current)
    {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }

  const handleClick = () =>
  {
    if (holding)
    {
      setHolding(false);
    }
    else
    {
      onClick(team);
    }
  }

  return (
    <div className={className}>
      <div className={classes.container}
        onClick={handleClick}
        onTouchStart={handleButtonPress} 
        onTouchEnd={handleButtonRelease} 
        onMouseDown={handleButtonPress} 
        onMouseUp={handleButtonRelease} 
        onMouseLeave={handleButtonRelease}
      >
        <img className={classes.logo} 
          alt={`${activeTeam.fullName} Team Logo`} 
          src={activeTeam.logos[logoNumber].secureUrl} />
        {
          favourite ? (
            <div className={classes.starContainer}>
              <span className={
                classNames(
                  "fa fa-star checked",
                  classes.backgroundStar
                )
              }></span>
              <span className={
                classNames(
                  "fa fa-star checked",
                  classes.star
                )
              }></span>
            </div>
          ) : null
        }
        {activeTeam.fullName}
      </div>
    </div>
  );
}

export default Team;