import './App.css';
import React from 'react';
import Login from './login';
import { Routes,Route, Link, BrowserRouter } from 'react-router-dom'
import Portfolio from './portfolio';
import Home from './home';
import { useLayoutEffect,useState } from 'react';
import Cookies from 'js-cookie';
function App(props) {
  // useEffect(()=>{
  //   console.log("First");
   
  //  });
  const [status,setStatus] = useState("NO");
   const auth=async()=>{
    const u = Cookies.get('name');
    const token = Cookies.get('jwtoken');
    const id = Cookies.get('id');
    const res=  await fetch("http://localhost:5000/auth", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: u, token: token, id: id }),
    })
      .then(function (response) {
       
        return response.json(); // call the json method on the response to get JSON
      })
      .then(function (d) {
        setStatus(d);
             });
   }
  return (
    
    <div className="App">
     
      
      {/* { auth() && status =="ok" && <Route path="/" element={<Home />} />}
      {auth() && status!="ok" && <Route path="/" element={<Login />} />} */}
      <Routes>
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
       </Routes>
      {/* <Route path="/home" element={<Home />} /> */}
      {/* <Route path="*" ={<NotFound />} /> */}
   
   
    
    </div>
  );
}

export default App;
