export default function dataforchart(){
   
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = '0FJEUPLIJDA8RM44';
    let StockSymbol = 'GE';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${StockSymbol}&interval=5min&outputsize=full&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
        //   console.log(data);
          let newdata=[];
        //   for (var key in data['Time Series (Daily)']) {
        //     stockChartXValuesFunction.push(key);
        //     stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
        //   }

        //   // console.log(stockChartXValuesFunction);
        //   pointerToThis.setState({
        //     stockChartXValues: stockChartXValuesFunction,
        //     stockChartYValues: stockChartYValuesFunction
        //   });
        for(var key in data['Time Series (5min)'])
        {
            newdata.push({'Date': key,
            'Open':data['Time Series (5min)'][key]['1. open'],
            'High':data['Time Series (5min)'][key]['2. high'],
            'Low':data['Time Series (5min)'][key]['3. low'],
            'Close':data['Time Series (5min)'][key]['4. close'],
            'Volume':data['Time Series (5min)'][key]['5. volume']});
        }
        console.log(newdata);
        }
       
        
      )
  }

