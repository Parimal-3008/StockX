import React, { useState } from "react";
import "./historycard1.css";
const HistoryCard1 = (props) => {
  

  return (
    <div id="parentcard1" >
    <div id="status1">{props.status}</div>
     <div id="quantity1">{props.quantity}</div>
     <div id="price1">{props.price}</div>
     <div id="date">{props.date}</div>
    </div>
  );
};
export default HistoryCard1;
