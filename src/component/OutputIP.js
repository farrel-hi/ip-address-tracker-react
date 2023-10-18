import React from "react";
import './OutputIP.css';

function OutputIP(props) {
  return(
    <div className="output-container">
      <h3 className="category">{props.type}</h3>
      <h2 className="value">{props.value}</h2>
    </div>
  );
}

export default OutputIP;