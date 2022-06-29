import React, { useState, useEffect } from "react";
import profileStore from "../../store/profileStore";
import RequestItem from "../Requests/RequestItem";
import { observer } from "mobx-react";
import authstore from "../../store/authStore";
import { Avatar } from "@mui/material";
import { Spinner } from "react-bootstrap";

const OneProfile = () => {
  if (profileStore.loading || authstore.loading)
    <div className="spinner">
      <Spinner color="white" />
    </div>;

  const info = profileStore.oneProfile;

  const requests = info.requests?.map((req) => (
    <div className="reqs">
      <RequestItem key={req._id} request={req} />
    </div>
  ));

  return (
    <>
      <header className="App-header">
        <div className="top-profile">
          <Avatar />
          <h1>{authstore.user.username} Profile</h1>
        </div>
      </header>
      <div className="bk">
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
};

export default observer(OneProfile);
