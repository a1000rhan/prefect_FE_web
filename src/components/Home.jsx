import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Home = () => {
  return (
    <div className="bk">
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="perfect-title">Perfect</h1>
        <p className="perfect-subtitle">Air Condition Company in Kuwait</p>
        <div>
          <Link to="/signin">
            <button className="btn" onClick={() => {}}>
              Sign In
            </button>
          </Link>
          <Link to="signup">
            <button className="btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
