const piedata=(port)=>{
  let data=[];
  for(let i in port)
  {
    data.push({
     "Stock":(String(port[i]['stockname'])+":"+(String(port[i]['quantity']))),
     "Investment": port[i]['total_price']
    });
  }
//   console.log(data);
  return data;

}
export default piedata;