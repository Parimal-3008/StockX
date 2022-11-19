import company from "./compamylist";
import API_KEY_S from "./apikey"
const getlive=async(setlive)=>{
let p=new Map;
for(let i in company)
{
    
    // console.log("Yahac",company[i]['name'],company.length);
    
        let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${company[i]['name']}&interval=1min&apikey=${API_KEY_S}`;
        await fetch(url)
    .then((response) => response.json())
    .then((json) => {
        for(let j in json["Time Series (1min)"])
        {
            // console.log(company[i]['name']+":",j);
            p.set(
                String( company[i]['name']) ,  Number(json["Time Series (1min)"][j]["3. low"])
              );
              break;

        }
        
        
          
    });

    
}
// if(p!=undefined && p.length!=0)
//         setlive(p);
// console.log(p);
return p;
}
export default getlive;
