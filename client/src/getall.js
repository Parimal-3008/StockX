
import React,{useState} from "react";
  
 
const Getall=async (props)=>{
  const [balance,setbalance] = useState();
  const [holdings,setholdings] = useState();
  const [history,sethistory] = useState();
      const u = props.username;
      const balanceresponse = await fetch("http://localhost:5000/funds", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: props.username }),
    })
          .then(function (response) {
        return response.json(); // call the json method on the response to get JSON
      })
      .then(function (d) {
       
          setbalance(d);
      });
      const holdingsresponse = await fetch("http://localhost:5000/portfolio", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: u}),
      })
            .then(function (response) {
          return response.json(); // call the json method on the response to get JSON
        })
        .then(function (d) {
          
            setholdings(d);
       
        });
        const historyresponse = await fetch("http://localhost:5000/history", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: u}),
      })
            .then(function (response) {
          return response.json(); // call the json method on the response to get JSON
        })
        .then(function (d) {
          
            sethistory(d);
       
        });
        return ({"f1":balance,"hold":holdings,"hist":history});
      }
      export default Getall;