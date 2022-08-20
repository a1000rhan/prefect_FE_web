import React, { useEffect } from "react";
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
import Profiles from "./Profiles/Profiles";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const Home = () => {
  const workerRequests = requestStore?.requests.map((req) => (
    <div className="reqs">
      <RequestItem request={req} key={req._id} />
    </div>
  ));
  const { i18n, t } = useTranslation();
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  const info = profileStore.oneProfile;

  const requests = info?.requests?.map((req) => (
    <div className="reqs">
      <RequestItem request={req} key={req._id} />
    </div>
  ));
  return (
    <div className="bk">
      <>
        {authstore?.user ? (
          profileStore.loading || authstore.loading || requestStore.loading ? (
            <div className="spinner">
              <Spinner animation="border" variant="dark" />
            </div>
          ) : (
            <>
              {authstore?.user.type === "worker" ? (
                <>
                  <OneProfile />
                </>
              ) : (
                <Profiles />
              )}
            </>
          )
        ) : (
          <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="perfect-title">Perfect</h1>
            <p className="perfect-subtitle">Air Condition Company in Kuwait</p>
            <div>
              <Link to="/signin">
                <button className="btns" onClick={() => {}}>
                  Sign In
                </button>
              </Link>
              <Link to="signup">
                <button className="btns">Sign Up</button>
              </Link>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default observer(Home);
