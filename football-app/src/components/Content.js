import React, { useState } from "react";
import "../App";
import Leagues from "./Leagues";
import Standings from "./Standings";

const Content = () => {
  const [active, setActive] = useState(true);                                                   //local state. Tab-league will be given default values - will be on league by default                      

  return (
    <div className="content-container">
      <div className="tabs"> 
        <div className="tab-leagues" onClick={() => setActive(true)}>                           
          <h2 style={{ color: active ? "#c20114" : null }}>Leagues</h2>
        </div>
        <div className="tab-standings" onClick={() => setActive(false)}>
          <h2 style={{ color: !active ? "#c20114" : null }}>Standings</h2>
        </div>
      </div>

      {active ? <Leagues /> : <Standings />}    
    </div>
  );
};

export default Content;