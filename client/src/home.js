import React, { useState } from "react";
import "./home.css";
import Nav from "./nav";
import dataforchart from "./data";
import compamylist from "./compamylist";
import Slider from "@mui/material/Slider";
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Ccard from "./ccard";
import FixedHeaderStory from "react-data-table-component";
import ShowData from "./ShowData";

import HistoryCard1 from "./historycard1";
export default function Home(props) {
  let funds = 1000;
  let currentprice = 5;
  let availablestock = 20;
  let currentstockhistory = [
    {
      name:"GE",
      status: "buy",
      quantity: 69,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
    {
      name:"GE",
      status: "buy",
      quantity: 69,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
    {
      name:"GE",
      status: "buy",
      quantity: 69,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
    {
      name:"GE",
      status: "buy",
      quantity: 69,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
    {
      name:"GE",
      status: "buy",
      quantity: 69,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
    {
      name:"GE",
      status: "buy",
      quantity: 69,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
    {
      name:"GE",
      status: "buy",
      quantity: 39,
      price: 1000,
      date: "2022-10-24 12:27:14.413",
    },
    {
      name:"GE",
      status: "buy",
      quantity: 1,
      price: 1000,
      date: "2022-10-24 12:28:03.878",
    },
    {
      name:"GE",
      status: "sell",
      quantity: 40,
      price: 1000,
      date: "2022-10-24 12:33:19.387",
    },
  ];
  const [style1, setStyle1] = useState("afterlbuyclick");
  const [style2, setStyle2] = useState("r");
  const [temp1, settemp1] = useState("temp1a");
  const [temp2, settemp2] = useState("b4");
  const [maxamt, setmaxamt] = useState(funds / currentprice);
  const [totalprice, setprice] = useState("");
  const [st, setst] = useState("BUY");
  const [counter, setcounter] = useState(1);
  const [submitbutton, setsubmitbutton] = useState("submitbuttonbuy");
  const [para, setpara] = useState("p1");
  const [obj, setobj] = useState("");
  const submit = () => {};
  const columns = [
    {
      name: "status",
      selector: (row) => row.status,
    },
    {
      name: "quantity",
      selector: (row) => row.quantity,
    },
    {
      name: "price",
      selector: (row) => row.price,
    },
    {
      name: "date",
      selector: (row) => row.date,
    },
  ];
  const getcompany = (name123) => {
    setobj(name123);
    //chnage the grpah and stock history with curretn user over here
    console.log("in parent" + name123);
  };

  const lbuy = () => {
    setStyle1("afterlbuyclick");
    setStyle2("r");
    settemp1("temp1a");
    settemp2("b4");
    setst("BUY");
    setpara("p1");
    setsubmitbutton("submitbuttonbuy");
  };
  const rbuy = () => {
    setStyle2("afterrbuyclick");
    setStyle1("l");
    settemp2("temp2a");
    settemp1("b4");
    setst("SELL");
    setpara("p2");
    setsubmitbutton("submitbuttonsell");
  };
  return (
    <div id="root">
      <Nav root={props.root}/>
      <div className="parent1">
        <div className="left">
          {
            compamylist.map((p) => {
            return (
              <Ccard
                name={p.name}
                Price={p.Price}
                change={p.change}
                functi={getcompany}
              />
            );
          })}
        </div>
        <div className="middle">{obj}</div>
        <div className="right">
          {/* <button onClick={dataforchart(props)}>Data</button> */}
          <FixedHeaderStory
            fixedHeader
           
            fixedHeaderScrollHeight="100%"
            columns={columns}
            data={currentstockhistory}
          />
        </div>
      </div>
      <div className="buysellblock">
        <div className="left2">
          <div id={temp1}></div>
          <button id={style1} onClick={lbuy}>
            BUY
          </button>
          <div id={temp2}></div>
          <button id={style2} onClick={rbuy}>
            SELL
          </button>
        </div>
        <div className="middle2">
          <Slider
            defaultValue={maxamt / 2}
            min={0}
            max={maxamt}
            aria-label="Always visible"
            getAriaValueText={(index) => {
              setcounter(index);
              setprice(index * currentprice);
            }}
            valueLabelDisplay="on"
          />
          <p id={para}>
            No of stocks: {counter} Current price: {currentprice} Total cost:{" "}
            {totalprice}
          </p>
          <button onClick={submit} id={submitbutton}>
            {st}
          </button>
        </div>
        <div className="right2">
         <ShowData title = {"FUNDS"} value = {funds} />
         <ShowData title = {"Stocks"} value = {availablestock} />
            
         
        </div>
      </div>
    </div>
  );
}
