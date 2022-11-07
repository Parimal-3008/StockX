import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../src/nav.css";
import { useNavigate } from "react-router-dom";
export default function Nav(props) {
  const nav = useNavigate();
  const [balance, setbalance] = useState();
  const [u, setusername] = useState(props.username);
  const [holdings, setholdings] = useState();
  const [history, sethistory] = useState();
  const logout =()=>{
    Cookies.set('name', {expires: Date.now()});
    Cookies.set('id', {expires: Date.now()});
    Cookies.set('jwtoken', {expires: Date.now()});
    nav("/login");
  };
  const reset = async () => {
    const reset = await fetch("http://localhost:5000/delete", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: Cookies.get("name") }),
    })
      .then((r) => {
        return r.json();
      })
      .then((d) => {
        console.log(d);

        return d;
      });
  };

  return (
    <nav>
      <label className="logo">StockX</label>
      <ul>
        <Link to={"/"}>
          <li>Home </li>
        </Link>

        <Link to={"/portfolio"}>
          <li>Portfolio </li>
        </Link>
        <Link to={"/"}>
          <li onClick={reset}>RESET FUNDS </li>
        </Link>
        <li onClick={logout}> Logout </li>
      </ul>
    </nav>
  );
}
