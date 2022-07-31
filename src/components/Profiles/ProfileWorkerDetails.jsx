import React, { useState, useEffect } from "react";
import profileStore from "../../store/profileStore";
import requestStore from "../../store/requestsStore";
import RequestItem from "../Requests/RequestItem";
import authstore from "../../store/authStore";
import { observer } from "mobx-react";
import { Avatar } from "@mui/material";
import { Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

const ProfileWorkerDetails = () => {
  const navigate = useNavigate();

  const { worker } = useParams();
  const info = profileStore.profiles.find((profile) => profile._id === worker);

  const requestD = info?.requests.map((req) => (
    <div className="reqs">
      <RequestItem request={req} key={req._id} />
    </div>
  ));

  return (
    <>
      <div className="bk">
        {profileStore.loading || authstore.loading || requestStore.loading ? (
          <div>
            <Spinner color="black" />
          </div>
        ) : (
          <>
            <header className="prof-header">
              <div className="App-header2">
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
              </div>

              <div className="profile-info">
                <p className="labelT">
                  <Icon.Person color="white" /> &nbsp;: &emsp;
                  {info?.firstName} {info?.lastName}
                </p>

                <p className="labelT">
                  <Icon.CardChecklist color="white" /> &nbsp;: &emsp;
                  {info?.civilId}
                </p>
                <p className="labelT">
                  <Icon.GeoAlt /> &nbsp;: &emsp;
                  {info?.address}
                </p>
              </div>
            </header>

            <div className="all-req">{requestD}</div>
          </>
        )}
      </div>
    </>
  );
};

export default observer(ProfileWorkerDetails);
