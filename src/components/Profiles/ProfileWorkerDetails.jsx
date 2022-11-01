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
import { useTranslation } from "react-i18next";

const ProfileWorkerDetails = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { worker } = useParams();
  const info = profileStore.profiles.find((profile) => profile._id === worker);

  const requestPending = info?.requests.map((req, index) => (
    <div className="reqs">
      {req.status === "pending" && <RequestItem request={req} key={index} />}
    </div>
  ));
  const requestothers = info?.requests.map((req, index) => (
    <div className="reqs">
      {req.status !== "pending" && <RequestItem request={req} key={index} />}
    </div>
  ));

  return (
    <>
      <div className="bk">
        {profileStore.loading || authstore.loading || requestStore.loading ? (
          <div>
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <>
            <header className="prof-header">
              <div className="App-header2">
                {i18n.language === "ar" ? (
                  <Icon.ArrowRight
                    onClick={() => navigate(-1)}
                    size={30}
                    className="top-icon"
                  />
                ) : (
                  <Icon.ArrowLeft
                    onClick={() => navigate(-1)}
                    size={30}
                    className="top-icon"
                  />
                )}

                <Avatar
                  src={info?.image}
                  sx={{
                    width: 80,
                    height: 80,
                    marginTop: 2,
                    marginRight: 5,
                    objectFit: "fill",
                    border: "3px solid white",
                  }}
                />
                <h8>
                  {info?.owner.username} {t("profile")}
                </h8>
              </div>

              <div className="profile-info">
                <p className="labelT">
                  <Icon.Person color="white" /> &nbsp;: &emsp;
                  {info?.firstName} {info?.lastName}
                </p>

                {/* <p className="labelT">
                  <Icon.CardChecklist color="white" /> &nbsp;: &emsp;
                  {info?.civilId}
                </p> */}
                {/* <p className="labelT">
                  <Icon.GeoAlt /> &nbsp;: &emsp;
                  {info?.address}
                </p> */}
              </div>
            </header>

            <div className="all-req">{requestPending}</div>
            <div className="all-req">{requestothers}</div>
          </>
        )}
      </div>
    </>
  );
};

export default observer(ProfileWorkerDetails);
