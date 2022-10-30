import React,{useState} from "react";
import "../src/nav.css"
import Home from "./home";
import Login from "./login";
import Portfolio from "./portfolio";

export default function Nav(props){
  const [balance,setbalance] = useState();
  const [u,setusername] = useState(props.username);
  const [holdings,setholdings] = useState();
  const [history,sethistory] = useState();
// const Getall=async (username2)=>{
 
//       // await setusername(props.username);
//       const balanceresponse = await fetch("http://localhost:5000/funds", {
//       method: "POST",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username:username2 }),
//     })
//           .then(function (response) {
//         return response.json(); // call the json method on the response to get JSON
//       })
//       .then(function (d) {
       
//           setbalance(d);
//           console.log(balance);
//       });
//       const holdingsresponse = await fetch("http://localhost:5000/portfolio", {
//         method: "POST",
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username: username2}),
//       })
//             .then(function (response) {
//           return response.json(); // call the json method on the response to get JSON
//         })
//         .then(function (d) {
          
//             setholdings(d);
       
//         });
//         const historyresponse = await fetch("http://localhost:5000/history", {
//         method: "POST",
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username: username2}),
//       })
//             .then(function (response) {
//           return response.json(); // call the json method on the response to get JSON
//         })
//         .then(function (d) {
          
//             sethistory(d);
       
//         });
      
//       }
  const home=()=>{   
    //  Getall(props.username);
   
    props.root.render(<Home root={props.root} username={props.username} funds={balance} holdings={holdings} history={history}  />);
 }
 
 const portfolio=()=>{
  //  Getall(props.username);
  props.root.render(<Portfolio root={props.root} username={props.username}/> );// funds={balance} holdings={holdings} history={history}   />);
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