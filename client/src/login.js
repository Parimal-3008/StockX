import "./login.css";
import Signup from "./signup";
import Home from "./home";
export default function Login(props) {
  const senddetails = async () => {
    props.root.render(
      <>
        <Home root={props.root} />
      </>
    );
    // const u = document.getElementById("username").value;
    // const p = document.getElementById("password").value;
    // const response = await fetch("http://localhost:5000/login", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username: u, password: p }),
    // })
    //   .then(function (response) {
    //     return response.json(); // call the json method on the response to get JSON
    //   })
    //   .then(function (d) {
    //     if (d === "Login succesfull") {
    //       // render home page
    //       console.log("logged in");
    //     } else alert("Fill valid credentials");
    //   });
  };
  return (
    <div className="root">
      <div id="left">
        <div className="temp">
          <h1 id="login">Login</h1>
          <label for="username" id="lu">
            USERNAME
          </label>
          <br></br>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required="true"
          ></input>
          <br></br>
          <label for="password" id="pu">
            PASSWORD
          </label>
          <br></br>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required="true"
          ></input>
          <div class="center" id="center">
            <button id="login2" onClick={senddetails}>
              Log In
            </button>
          </div>
        </div>
      </div>

      <div id="right">
        <div>
          <h1 id="righth1">Welcome to StockX</h1>
          <p id="rightp">Don't have an account?</p>
          <div class="center">
            <button
              id="create"
              onClick={() => {
                props.root.render(
                  <>
                    <Signup root={props.root} />
                  </>
                );
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
