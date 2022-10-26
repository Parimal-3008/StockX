import React,{useState} from 'react';
import "./home.css";
import Nav from './nav';
import dataforchart from './data';
export default function Home(props)
{
    return(<div id='root'>
     <Nav />
   <div className='parent1'>
     <div className='left'></div>
     <div className='middle'></div>
     <div className='right'>
      <button onClick={dataforchart}>Data</button>
     </div>
   </div>
   <div className='buysellblock'></div>
    </div>);
}