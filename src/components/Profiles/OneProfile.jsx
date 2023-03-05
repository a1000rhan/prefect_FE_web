import React from "react";
import profileStore from "../../store/profileStore";
import RequestItem from "../Requests/RequestItem";
import { observer } from "mobx-react";
import authstore from "../../store/authStore";
import { Avatar, CircularProgress } from "@mui/material";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import requestStore from "../../store/requestsStore";
import * as Icon from "react-bootstrap-icons";

const OneProfile = () => {
  if (profileStore.loading || authstore.loading || requestStore.loading)
    <div className="spinner">
      <CircularProgress />
    </div>;

  const info = profileStore?.oneProfile;

  const requests = info?.requests
    // .filter((req) => req?.date == moment(new Date()).format("YYYY-MM-DD"))
    .map((req) => (
      <div className="reqs">
        {req.status === "pending" && (
          <RequestItem request={req} key={req._id} />
        )}
      </div>
    ))
    .sort((a, b) => a.date - b.date && a.time - b.time);

  return (
    <>
      <div className="bk">
        {profileStore.loading || authstore.loading || requestStore.loading ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          <>
            <header className="prof-header">
              <div className="App-header2">
                {/* <Icon.ArrowLeft
                  onClick={() => navigate(-1)}
                  size={30}
                  className="top-icon"
                /> */}
                <Avatar
                  src={info?.image}
                  sx={{
                    width: 80,
                    height: 80,
                    marginTop: 2,
                    objectFit: "fill",
                    border: "3px solid white",
                  }}
                />
                {/* <h1>{info?.owner.username} Profile</h1> */}
              </div>

              <div className="profile-info">
                <p className="labelT">
                  <Icon.Person color="white" />
                  &nbsp;: &emsp;
                  {info?.firstName} {info?.lastName}
                </p>

                {/* <p className="labelT">
                  <Icon.CardChecklist color="white" />
                  &nbsp;: &emsp;
                  {info?.civilId}
                </p>
                <p className="labelT">
                  <Icon.GeoAlt />
                  &nbsp;: &emsp;
                  {info?.address}
                </p> */}
              </div>
            </header>

            <div className="all-req2">{requests}</div>
          </>
        )}
      </div>
    </>
  );
};

export default observer(OneProfile);
