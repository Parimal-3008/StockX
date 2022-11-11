import getlive from "./livedata";

const bardata = (port,lived,setbardata1) => {
  let data = [];
  // console.log(livedata)
  for (let i in port) {
   
    {
      
    
      // console.log(port)
      data.push({
        Stock: port[i]["stockname"],
        Investment: port[i]["total_price"],
        Current: (
          port[i]["quantity"] * lived.get(port[i]['stockname']))});

     
    }
    // data.push({
    //   Stock: port[i]["stockname"],
    //   Investment: port[i]["total_price"],
    //   Current: Number(
    //     port[i]["quantity"]) *
    //     Number(
    //       (async () => {
    //         let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${port[i]["stockname"]}&interval=1min&apikey=0FJEUPLIJDA8RM44`;
    //         await fetch(url)
    //           .then((response) => response.json())
    //           .then((json) => {
    //             for (let j in json["Time Series (1min)"]) {
    //              console.log("jkggyfufg",json["Time Series (1min)"][j]["3. low"]);

    //               return Number(json["Time Series (1min)"][j]["3. low"]);
    //             }
              
    //           });
    //       })()
    //     ),
    // });
  }
  console.log("bar",data)
  setbardata1(data);
  return data;
};

export default bardata;
