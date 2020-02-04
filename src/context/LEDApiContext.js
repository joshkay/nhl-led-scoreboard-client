import React, { useState, useEffect } from "react";

const { Provider, Consumer } = React.createContext({});

const LEDApiProvider = ({ children }) =>
{
  const [state, setState] = useState({
    loading: false,
    error: undefined,
    data: {}
  });

  useEffect(() =>
  {
    const updateData = async () =>
    {
      setState({
        loading: true,
        error: undefined,
        data: {}
      });
      
      try {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/config`);
  
        setState({
          loading: false,
          error: undefined,
          data
        });
      } 
      catch (error) 
      { 
        setState({
          loading: false,
          error,
          data: {}
        });
      } 
    }

    updateData();
    
  }, []);

  return (
    <Provider value={state}>
      { children }
    </Provider>
  )
}

export default {
  Provider: LEDApiProvider,
  Consumer
};