import './App.css';
import React from 'react';
import Login from './login';
function App(props) {
 
  return (
    <div className="App">
       <Login root={ props.root }/>
    
    </div>
  );
}

export default App;
