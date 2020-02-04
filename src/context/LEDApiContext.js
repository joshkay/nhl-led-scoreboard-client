import React, { useState } from "react";
import FetchData from "../components/data/FetchData";

const Context = React.createContext({});

const LEDApiProvider = ({ children }) =>
{
  const [state, setState] = useState({});
  console.log(state)

  return (
    <React.Fragment>
      <FetchData 
        url={`${process.env.REACT_APP_API_URL}/config`} 
        onChange={(newState) => setState(newState)}
      />
      <Context.Provider value={state}>
        { children }
      </Context.Provider>
    </React.Fragment>
  )
}

export { LEDApiProvider };

export default Context;