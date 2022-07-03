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
              <header className="App-header">
                <div className="top-profile">
                  <Avatar />
                  <h1>{authstore.user.username} Profile</h1>
                </div>
              </header>

              <div className="container">
                <div className="profile-info">
                  <p className="labelT">
                    worker name: {info?.firstName} {info?.lastName}
                  </p>
                  <p className="labelT">worker age: {info?.age}</p>
                  <p className="labelT">Civil ID: {info?.civilId}</p>
                  <p className="labelT">Address: {info?.address}</p>
                  <hr className="divider" />
                  <div className="all-req">{requests}</div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <header className="App-header">
                <h1>Requests</h1>
              </header>

              <div className="container">
                <div className="all-req">{workerRequests}</div>
              </div>
            </div>
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
