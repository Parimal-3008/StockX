import Login from "./login";
import "./signup.css";

export default function Signup(props) {
   const register =async()=>{
    const u1 = document.getElementById("username1").value;
    const p1 = document.getElementById("password1").value;
    const p2 = document.getElementById("password2").value;
    
    if(p1!=p2)
    {
      alert("both passwords must match");
    }
    else
    {
      var data = new FormData();
        const response = (await fetch('http://localhost:5000/register', {  

    method: 'POST', 
    mode: 'cors', 
    headers: {
      'Content-Type': 'application/json',
  },
    body: JSON.stringify({"username":u1 ,"password":p1})

  }) .then(function (a) {
    return a.json(); // call the json method on the response to get JSON
})
.then(function (d) {
    if(d==="Successfully logged in")
    {
      // render home page
      console.log("Successfully registered and logged in");
    }
    else
    alert("Choose another username");
}));
  
    }
   };
    return (
      <div className="root2">
      <div className="upper">
          StockX
      </div>
      
      <div className="lower">
        <h1 className="heading1">Sign Up</h1>
        <input type="text" className="signupht"  id="username1"  placeholder="Enter your username" required="true"></input>
        <br></br>
        <input type="password" className="signupht" id="password1" placeholder="Enter your password" required="true"></input>
        <br></br>
        <input type="password" className="signupht" id="password2" placeholder="Re-enter your password" required="true"></input>
       
        <div id="signupButton" >
        <button id="button2" onClick={register}>Sign Up</button>
        
        </div>
        <button id="already" onClick={()=>{ props.root.render(<Login root={props.root}/>)}}>Already have an account LOG IN</button>
      </div>
    </div>
    );
  }
  