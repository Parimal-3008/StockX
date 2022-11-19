import React, { useEffect, useState } from "react";
import "./ccard.css";
import API_KEY_S from "./apikey";
const Ccard = (props) => {
  const [companyname, setcompanyname] = useState();
  const [price2,setprice2]= useState(0);
  const handlechange = () => {
    props.functi(props.name);
    (async()=>{
      let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${props.name}&interval=1min&apikey=${API_KEY_S}`;
      await fetch(url)
  .then((response) => response.json())
  .then((json) => {
     let p=0;
     for(let i in json["Time Series (1min)"])
     {
        p = Number(json["Time Series (1min)"][i]["3. low"]);
        props.Price(p);
       
        break;
     }
  });
  })()
  };
  useEffect(() => {
    setInterval(() => {
      (async()=>{
          console.log('updating data..')
          let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${props.name}&interval=1min&apikey=${API_KEY_S}`;
          await fetch(url)
      .then((response) => response.json())
      .then((json) => {
         let p=0;
         for(let i in json["Time Series (1min)"])
         {
            p = Number(json["Time Series (1min)"][i]["3. low"]);
            setprice2(p);
           
            break;
         }
      });
      })()
      // console.log(price2);
     
      
    }, 60000);
  }, [])
  

  return (
    <div id="parentcard" onClick={handlechange}>
      <div id="leftcard">
        <div id="topcard">{props.name}</div>
        <div id="bottomcard">${price2}</div>

      </div>
    
    </div>
  );
};
export default Ccard;
