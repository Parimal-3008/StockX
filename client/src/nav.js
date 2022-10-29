import React from "react";
import "../src/nav.css"
import Home from "./home";
import Login from "./login";
import Portfolio from "./portfolio";
export default function Nav(props){
  const home=()=>{
    props.root.render(<Home root={props.root} />);
 }
 const portfolio=()=>{
  props.root.render(<Portfolio root={props.root} />);
}
const login=()=>{
  props.root.render(<Login root={props.root} />);
}
    return ( <nav>     
            
     
        <label   className="logo">StockX</label>
        <ul>
          <li   className="active"  onClick={home}>Home  </li>
         
          <li  onClick={portfolio}> Portfolio </li>
          <li> Reset Funds</li>
          <li onClick={login}> Logout  {login}</li>
        </ul>
      </nav>);
}