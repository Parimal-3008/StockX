import React, { useState } from "react";
import "./ccard.css";
const Ccard = (props) => {
  const [companyname, setcompanyname] = useState();
  const handlechange = () => {
    props.functi(props.name);
  };

  return (
    <div id="parentcard" onClick={handlechange}>
      <div id="leftcard">
        <div id="topcard">{props.name}</div>
        <div id="bottomcard">${props.Price}</div>
      </div>
      <div id={props.change >= 0 ? "rightcard12" : "rightcard13"}>
        {props.change}%
      </div>
    </div>
  );
};
export default Ccard;
