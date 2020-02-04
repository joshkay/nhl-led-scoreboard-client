import React, { useState, useEffect } from "react";

const Context = React.createContext({});

const NHLApiProvider = ({ children }) =>
{
  const [state, setState] = useState({
    loading: false,
    error: undefined,
    data: {}
  });

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      setState({
        loading: true,
        error: undefined,
        data: {}
      });
      
      try {
        const res = await fetch("https://cors-anywhere.herokuapp.com/https://records.nhl.com/site/api/franchise?include=teams.id&include=teams.active&include=teams.triCode&include=teams.placeName&include=teams.commonName&include=teams.fullName&include=teams.logos&include=teams.conference.name&include=teams.division.name&include=teams.franchiseTeam.firstSeason.id&include=teams.franchiseTeam.lastSeason.id&include=teams.franchiseTeam.teamCommonName");

        const { data } = await res.json();
  
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

    fetchData();
    
  }, []);

  return (
    <Context.Provider value={state}>
      { children }
    </Context.Provider>
  )
}

export { NHLApiProvider };

export default Context;