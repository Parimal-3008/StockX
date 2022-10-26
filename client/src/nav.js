import React from "react";
import "../src/nav.css"
export default function Nav(){
    return ( <nav>     
            
     
        <label   className="logo">StockX</label>
        <ul>
          <li   className="active" >Home  </li>
         
          <li> Portfolio  </li>
          <li> Reset Funds</li>
          <li> Logout  </li>
        </ul>
      </nav>);
}