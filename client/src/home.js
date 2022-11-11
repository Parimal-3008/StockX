import React, { useState, useLayoutEffect, useEffect } from "react";
import "./home.css";
import Nav from "./nav";
// import dataforchart from "./data";
import Chart, {CommonSeriesSettings,  Series,Reduction,ArgumentAxis,Label,Format,ValueAxis,Title,Legend,Export,Tooltip,} from "devextreme-react/chart";
import Cookies from "js-cookie";
import compamylist from "./compamylist";
import Slider from "@mui/material/Slider";
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Ccard from "./ccard";
import FixedHeaderStory from "react-data-table-component";
import ShowData from "./ShowData";
import ProtectedRoute from "./ProtectedRoute";
import { getfunds, getportfolio, gethistory } from "./getdata";
import stockvalue from "./Stock_Values";
import CanvasJSReact from "./canvasjs.react";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
let p = 0;
// import HistoryCard1 from "./historycard1";
export default function Home() {
  // console.log( props);

  // let currentprice = 5;
  // let availablestock = 20;
  let currentstockhistory = [];

  const [style1, setStyle1] = useState("afterlbuyclick");
  const [style2, setStyle2] = useState("r");
  const [temp1, settemp1] = useState("temp1a");
  const [temp2, settemp2] = useState("b4");
  const [funds, setfunds] = useState("0");
  const [hist, sethist] = useState({});
  const [port, setport] = useState({});
  const [currentprice,setcurrentprice] =useState(5);
  const [maxamt, setmaxamt] = useState(funds/currentprice);
  const [hist2, sethist2] = useState("");
  const [totalprice, setprice] = useState("");
  const [st, setst] = useState("BUY");
  const [counter, setcounter] = useState(1);
  const [submitbutton, setsubmitbutton] = useState("submitbuttonbuy");
  const [para, setpara] = useState("p1");
  const [company, setcompany] = useState("...");
  const [aftertransaction, settrac] = useState(0);
  const [currenthold, setcurrenthold] = useState("0");
  const [graph, setgraph] = useState(undefined);
  // company refers to company name
  
  const submit = async () => {
    console.log(st);
    const response = await fetch("http://localhost:5000/buy_sell", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: Cookies.get("name"),
        stockname: company,
        quantity: counter,
        status: st,
        current_price: currentprice,
      }),
    })
      .then(function (response) {
        return response.json(); // call the json method on the response to get JSON
      })
      .then(function (d) {
        console.log(d);
      });
    console.log("DONE");
    getfunds(setfunds);
    gethistory(sethist);
    getportfolio(setport);
    if (st === "BUY") setmaxamt(funds / currentprice);
    else {
      let yu = 0;
      for (let i in port) {
        // console.log("ino"+port[i].stockname)
        if (port[i].stockname == company) {
          yu = port[i].quantity;
          break;
        }
      }

      setmaxamt(yu);
      setcurrenthold(yu);
    }
    let temp2 = [];
    console.log("yo" + company);

    for (let i in hist) {
      if (hist[i].stockname === company) {
        temp2.push({
          status: hist[i].status,
          stockname: hist[i].stockname,
          quantity: hist[i].quantity,
          sp: hist[i].sp,
          date: hist[i].date,
        });
      }
    }

    if (temp2.length == 0)
      temp2.push({
        status: "-",
        stockname: "-",
        quantity: "-",
        sp: "-",
        date: "-",
      });
    console.log("asdf" + temp2);
    sethist2(temp2);
  };
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
      selector: (row) => row.sp,
    },
    {
      name: "date",
      selector: (row) => row.date,
    },
  ];
  const getcompany = async (name123) => {
    setcompany("...");
    setgraph(undefined);
    const r = await stockvalue(name123, "daily");
    setgraph(r);
    console.log(graph);
    setcompany(name123);
    
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
    setmaxamt(funds / currentprice);
    setsubmitbutton("submitbuttonbuy");
  };
  const rbuy = () => {
    setStyle2("afterrbuyclick");
    setStyle1("l");
    settemp2("temp2a");
    settemp1("b4");
    setst("SELL");
    setpara("p2");
    let yu = 0;
    for (let i in port) {
      // console.log("ino"+port[i].stockname)
      if (port[i].stockname == company) {
        yu = port[i].quantity;
        break;
      }
    }
    setmaxamt(yu);
    setcurrenthold(yu);
    setsubmitbutton("submitbuttonsell");
  };
  
  useEffect(() => {
    getfunds(setfunds);
    gethistory(sethist);
    getportfolio(setport);
  }, [funds]);
  useEffect(() => {
    console.log("in st and company");
    console.log(port + "..." + st);
    let yu = 0;
    for (let i in port) {
      if (port[i].stockname == company) {
        yu = port[i].quantity;
        break;
      }
    }
    if (st === "BUY") setmaxamt(funds / currentprice);
    else setmaxamt(yu);
    setcurrenthold(yu);
    console.log("holding" + yu);
  }, [company, port, hist, hist2]);
  useEffect(() => {
    let temp2 = [];
    console.log("yo" + company);

    for (let i in hist) {
      if (hist[i].stockname === company) {
        temp2.push({
          status: hist[i].status,
          stockname: hist[i].stockname,
          quantity: hist[i].quantity,
          sp: hist[i].sp,
          date: hist[i].date,
        });
      }
    }

    if (temp2.length == 0)
      temp2.push({
        status: "-",
        stockname: "-",
        quantity: "-",
        sp: "-",
        date: "-",
      });
    console.log("asdf" + temp2);
    sethist2(temp2);
  }, [company, hist]);
  
  return (
    <ProtectedRoute>
      {}
      <div id="root">
        <Nav />
        <div className="parent1">
          <div className="left">
            {compamylist.map((p) => {
              return (
                <Ccard
                  name={p.name}
                  Price={setcurrentprice}
                  change={p.change}
                  functi={getcompany}
                
                />
              );
            })}
          </div>

          <div className="middle">
            {/* { chart } */}
            {graph != undefined ? (
              <Chart id="chart" title="Stock Price" dataSource={graph}>
                <CommonSeriesSettings argumentField="date" type="candlestick" />
                <Series
                  name={company}
                  openValueField="o"
                  highValueField="h"
                  lowValueField="l"
                  closeValueField="c"
                >
                
                  <Reduction color="red" />
                </Series>
                <ArgumentAxis workdaysOnly={true}>
                  <Label format="shortDate" />
                </ArgumentAxis>
                <ValueAxis tickInterval={0}>
                  <Title text="US dollars" />
                  <Label>
                    <Format precision={0} type="currency" />
                  </Label>
                </ValueAxis>
                <Legend itemTextPosition="left" />
                <Export enabled={true} />
                <Tooltip
                  enabled={true}
                  location="edge"
                  
                />
              </Chart>
            ) : (
              <p>loading...</p>
            )}
          </div>
          <div className="right">
            {/* <button onClick={dataforchart(props)}>Data</button> */}
            <div id="right_top">Transaction History of {company}</div>
            <FixedHeaderStory
              fixedHeader
              fixedHeaderScrollHeight="90%"
              columns={columns}
              data={hist2}
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
              // defaultValue={maxamt / 2}
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
            <ShowData title={"FUNDS"} value={funds} />
            <ShowData title={"Stocks"} value={currenthold} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

