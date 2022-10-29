import React from "react";
import "./ShowData.css"
const ShowData=(props)=>{
    return(
        <div id="parent3">
        <div id="upper3">
            {props.title}
        </div>
           <div id="lower3">
            {props.value}
           </div>
        </div>
    );
};
export default ShowData;