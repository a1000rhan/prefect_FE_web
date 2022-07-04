import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import authstore from "../store/authStore";
import { observer } from "mobx-react";
import profileStore from "../store/profileStore";
import requestStore from "../store/requestsStore";
import RequestItem from "../components/Requests/RequestItem";
import { Spinner } from "react-bootstrap";
import { Avatar } from "@mui/material";
import OneProfile from "./Profiles/OneProfile";
import Requests from "./Requests/Requests";

const Home = () => {
  if (profileStore.loading || authstore.loading || requestStore.loading)
    <div className="spinner">
      <Spinner color="white" />
    </div>;
  const workerRequests = requestStore?.requests.map((req) => (
    <div className="reqs">
      <RequestItem request={req} key={req._id} />
    </div>
  ));
  const info = profileStore.oneProfile;

  const requests = info.requests?.map((req) => (
    <div className="reqs">
      <RequestItem request={req} key={req._id} />
    </div>
  ));
  return (
    <div className="bk">
      {authstore.user ? (
        <>
          {authstore.user.type === "worker" ? (
            <>
              <OneProfile />
            </>
          ) : (
            <Requests />
          )}
        </>
      ) : (
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
      )}
    </div>
  );
};

export default observer(Home);
