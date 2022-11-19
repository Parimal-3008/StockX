// import ReactDOM from "react-dom ";

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key

import API_KEY_S from "./apikey.js"
const stockvalue = async (org,type,key) => {
  let data = [];
  var url1 = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${org}&apikey=${API_KEY_S}`;
var url2 = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${org}&apikey=${API_KEY_S}`;
var url3 =`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${org}&apikey=${API_KEY_S}`;
  //TIME_SERIES_INTRADAY url1,3
  //TIME_SERIES_MONTHLY url2
  let urla;
  let format ;
  if(type == "daily")
  {
     urla = url3;
     format = "Time Series (Daily)";
  }
  else
  {
    urla = url1;
    format = "Weekly Time Series";
  }
  console.log(org);
  await fetch(urla)
    .then((response) => response.json())
    .then((json) => {
       let p=0;
       
      //  console.log(json["Time Series (1min)"])
      for (let i in json[format]) {
        p++;
      //  if(p>500)
      //   return data.reverse();
    
        data.push({
           date:new Date(i),
          l: Number(json[format][i]["3. low"]),
          h: Number(json[format][i]["2. high"]),
          o: Number(json[format][i]["1. open"]),
          c: Number(json[format][i]["4. close"]),
        });
       }
   });
      // console.log(data);
    return data.reverse();

};

export default stockvalue;
