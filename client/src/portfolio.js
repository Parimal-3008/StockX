import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import "./portfolio.css";
import Nav from "./nav";
import FixedHeaderStory from "react-data-table-component";
import ProtectedRoute from "./ProtectedRoute";
import { getfunds,gethistory,getportfolio } from "./getdata";
export default function Portfolio() {
  const [funds,setfunds] = useState("0");
  const [hist,sethist] = useState({});
  const [port,setport] = useState({});
  let currentstockhistory = [
    {
      name: "GE",
      status: "buy",
      quantity: 69,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
    {
      name: "GE",
      status: "buy",
      quantity: 69,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
    {
      name: "GE",
      status: "buy",
      quantity: 69,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
    {
      name: "GE",
      status: "buy",
      quantity: 69,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
    {
      name: "GE",
      status: "buy",
      quantity: 69,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
    {
      name: "GE",
      status: "buy",
      quantity: 69,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
    {
      name: "GE",
      status: "buy",
      quantity: 39,
      price: 1000,
      date: "2022-10-24 12:27:14.413",
    },
    {
      name: "GE",
      status: "buy",
      quantity: 1,
      price: 1000,
      date: "2022-10-24 12:28:03.878",
    },
    {
      name: "GE",
      status: "sell",
      quantity: 40,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
  ];
  let hold = [
    {
      stockname: "GE",
      quantity: 69,
      total_price: 1000,
      ivalue: 2000,
       
    },
    {
       stockname: "ADBE",
      quantity: 69,
      total_price: 1000,
      ivalue: 2000,
       
    },
    {
       stockname: "UTI",
      quantity: 69,
      total_price: 1000,
      ivalue: 2000,
       
    },
    {
       stockname: "MRF",
      quantity: 69,
      total_price: 1000,
      ivalue: 2000,
       
    },
    {
       stockname: "META",
      quantity: 69,
      total_price: 1000,
      ivalue: 2000,
       
    },
    {
       stockname: "CSCO",
      quantity: 69,
      total_price: 1000,
      ivalue: 2000,
       
    },
    {
       stockname: "MSFT",
      quantity: 69,
      total_price: 1000,
      ivalue: 2000,
       
    },
    {
       stockname: "IBM",
      quantity: 69,
      total_price: 1000,
      ivalue: 2000,
       
    },
    {
       stockname: "HON",
      quantity: 69,
      total_price: 1000,
      ivalue: 2000,
       
    },
  ];
  const columns2 = [
    {
      name: "name",
      selector: (row) => row.stockname,
    },
    {
      name: "quantity",
      selector: (row) => row.quantity,
    },
    {
      name: "Investment",
      selector: (row) => row.total_price,
    },
    {
      name: "Current Value",     
      selector: (row) =>"20",
    },
    {
      name: "Profit/Loss",
      selector: (row) => (row.quantity* 20)-row.total_price,
    },
  ];
  const columns = [
    {
      name: "name",
      selector: (row) => row.stockname,
    },
    {
      name: "date",
      selector: (row) => row.date,
    },
    {
      name: "quantity",
      selector: (row) => row.quantity,
    },
    {
      name: "price",
      selector: (row) => row.sp,
    },
    {
      name: "status",
      selector: (row) => row.status,
    },
  ];
  useEffect(() => {
    getfunds(setfunds);    
    gethistory(sethist);
    getportfolio(setport);
    
  }, []);

  return (
    <ProtectedRoute>
    <div>
      <Nav />
      <div id="parent4">
        <div id="upper4">
          <div id="left4">
            <div id="top41">
              <div className="joker">Total investments:</div>
              <div className="joker">Current holdings:</div>
              <div className="joker">Profit/Loss:</div>
            </div>
            <div id="bottom41"></div>
          </div>
          <div id="right4">
            <div id="top41"> Holdings</div>
            <div id="bottom40">
              {" "}
              <FixedHeaderStory
                fixedHeader
                fixedHeaderScrollHeight="100%"
                columns={columns2}
                data={port}
              />
            </div>
          </div>
        </div>

        <div id="lower4">
          <div id="top42">Transaction History</div>
          <div id="bottom41">
            <FixedHeaderStory
              fixedHeader
              fixedHeaderScrollHeight="90%"
              columns={columns}
              data={hist}
            />
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
