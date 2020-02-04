import React, { useState } from "react";
import FetchData from "../components/data/FetchData";

const Context = React.createContext({});

const NHLApiProvider = ({ children }) =>
{
  const [state, setState] = useState({});

  return (
    <React.Fragment>
      <FetchData
        url="https://cors-anywhere.herokuapp.com/https://records.nhl.com/site/api/franchise?include=teams.id&include=teams.active&include=teams.triCode&include=teams.placeName&include=teams.commonName&include=teams.fullName&include=teams.logos&include=teams.conference.name&include=teams.division.name&include=teams.franchiseTeam.firstSeason.id&include=teams.franchiseTeam.lastSeason.id&include=teams.franchiseTeam.teamCommonName"
        processData={data => data.data}
        onChange={(newState) => setState(newState)}
      />
      <Context.Provider value={state}>
        { children }
      </Context.Provider>
    </React.Fragment>
  )
}

export { NHLApiProvider };

export default Context;