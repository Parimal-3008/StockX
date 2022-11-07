import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const getfunds = async (setfunds) => {
  //   const [balance, setbalance] = useState("0");
  console.log(Cookies.get('name'));
  if (Cookies.get("name") == undefined ||Cookies.get("id") == undefined ||Cookies.get("jwtoken") == undefined) {
    return;
  }
  const balanceresponse = await fetch("http://localhost:5000/funds", {
    method: "POST",
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
      setfunds(d["funds"]);
      return d;
    });
};
const getportfolio = async (setport) => {
  if (
    Cookies.get("name") == "" ||
    Cookies.get("id") == "" ||
    Cookies.get("jwtoken") == ""
  ) {
    return;
  }
  //   const [balance, setbalance] = useState("0");
  const balanceresponse = await fetch("http://localhost:5000/portfolio", {
    method: "POST",
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
      setport(d["portfolio"]);
      return d;
    });
};
const gethistory = async (sethist) => {
  if (
    Cookies.get("name") == "" ||
    Cookies.get("id") == "" ||
    Cookies.get("jwtoken") == ""
  ) {
    return;
  }
  //   const [balance, setbalance] = useState("0");
  const balanceresponse = await fetch("http://localhost:5000/history", {
    method: "POST",
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
      sethist(d["hist"]);
      return d;
    });
};
export { getfunds, getportfolio, gethistory };
