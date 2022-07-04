import React, { useState, useEffect } from "react";
import profileStore from "../../store/profileStore";
import RequestItem from "../Requests/RequestItem";
import { observer } from "mobx-react";
import authstore from "../../store/authStore";
import { Avatar } from "@mui/material";
import { Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import requestStore from "../../store/requestsStore";

const ProfileWorkerDetails = () => {
  const navigate = useNavigate();
  if (profileStore.loading || authstore.loading || requestStore.loading) {
    <div>
      <Spinner color="black" />
    </div>;
  } else {
    const { worker } = useParams();
    const info = profileStore.profiles.find(
      (profile) => profile._id === worker
    );

    const requests = info?.requests.map((req) => (
      <div className="reqs">
        <RequestItem request={req} key={req._id} />
      </div>
    ));
    console.log(info);
    return (
      <>
        <div className="bk">
          <header className="App-header2">
            <Icon.ArrowLeft
              onClick={() => navigate(-1)}
              size={30}
              className="top-icon"
            />
            <Avatar
              src={info?.image}
              sx={{
                width: 80,
                height: 80,
                objectFit: "fill",
                border: "3px solid white",
              }}
            />
            <h1>{info?.owner.username} Profile</h1>
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
        </div>
      </>
    );
  }
};

export default observer(ProfileWorkerDetails);