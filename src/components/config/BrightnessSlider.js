import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    width: '100%',
    margin: 0,
    boxSizing: 'border-box',
    padding: 10
  },
  slider: {
    WebkitAppearance: 'none',
    appearance: 'none',
    width: '100%',
    height: 30,
    background: 'white',
    outline: 'none',
    opacity: '0.7',
    WebkitTransition: '.2s',
    transition: 'opacity .2s',
    borderRadius: 25,

    '&::-webkit-slider-thumb': {
      WebkitAppearance: 'none',
      appearance: 'none',
      width: 35,
      height: 35,
      background: '#282c34',
      cursor: 'pointer',
      borderRadius: '50%',
      border: '3px solid white'
    },

    '&::-moz-range-thumb': {
      width: 35,
      height: 35,
      background: '#282c34',
      cursor: 'pointer',
      borderRadius: '50%',
      border: '3px solid white'
    }
  }
});

const MIN_BRIGHTNESS = 1;
const MAX_BRIGTHNESS = 100;

const BrightnessSlider = () =>
{
  const classes = useStyles();

  const [brightness, setBrightness] = useState(50);

  //let timeout = useRef(null);
  const onChange = event => 
  {
    const newBrightness = event.target.value;
    setBrightness(newBrightness);

    // timeout.current && clearTimeout(timeout.current);
    // timeout.current = setTimeout(() => 
    // {
    //   if (newBrightness !== brightness)
    //   {
    //     setBrightnessRemote(newBrightness);
    //   }
    // }, 1000);
  }

  const commitChange = event =>
  {
    setBrightnessRemote(brightness);
  }

  const setBrightnessRemote = (newBrightness) => 
  {
    fetch(`${process.env.REACT_APP_API_URL}/brightness/${newBrightness}`, {method: 'PUT'});
  };
  
  return (
    <div className={classes.container}>
      <input type="range"
        onChange={onChange}
        onMouseUp={commitChange}
        onTouchEnd={commitChange}
        onKeyUp={commitChange}
        min={MIN_BRIGHTNESS} 
        max={MAX_BRIGTHNESS} 
        value={brightness}
        className={classes.slider} 
      />
    </div>
  );
}

export default BrightnessSlider;