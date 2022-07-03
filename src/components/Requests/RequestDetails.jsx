import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import requestStore from "../../store/requestsStore";
import * as Icon from "react-bootstrap-icons";
import { MenuItem, Menu } from "@mui/material";
import authstore from "../../store/authStore";

const RequestDetails = () => {
  const { slug } = useParams();
  const requestD = requestStore.requests.find(
    (request) => request.slug === slug
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDone = (e) => {
    e.preventDefault();
    requestD.status = "done";
    requestStore.updateRequest(requestD);
  };
  const onCancel = (e) => {
    e.preventDefault();
    requestD.status = "canceled";
    requestStore.updateRequest(requestD);
  };

  return (
    <div>
      <header className="App-header">
        <Icon.ArrowLeft
          onClick={() => navigate(-1)}
          size={30}
          className="top-icon"
        />
        <h1>Request Details</h1>
      </header>
      <div className="bk">
        <div className="details-container">
          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1>{requestD?.customerName}</h1>
              <Icon.ThreeDots
                style={{
                  display: authstore.user.type === "admin" ? "block" : "none",
                }}
                onClick={handleClick}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link to={`/updateRequest/${requestD._id}`}>
                  <MenuItem>Edit Request</MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>Delete Request</MenuItem>
              </Menu>
            </div>
            <div className="address-details">
              <h4>Address:&emsp;</h4>
              <p>
                &nbsp;House:&nbsp;
                {requestD?.customerAddress[0].house}, &nbsp;Street:&nbsp;
                {requestD?.customerAddress[0].street}, &nbsp;Block:&nbsp;
                {requestD?.customerAddress[0].block},
                <br />
                &nbsp;Apartment:&nbsp;
                {requestD?.customerAddress[0].apartment}, &nbsp;Floor:&nbsp;
                {requestD?.customerAddress[0].floor}, &nbsp;City:&nbsp;
                {requestD?.customerAddress[0].city}
              </p>
            </div>
            <hr className="divider" />
            <div className="detail-phone">
              <h4>Phone Number:&emsp; </h4>
              <p>{requestD?.customerPhone}</p>
            </div>
            <hr className="divider" />
            <div className="detail-phone">
              <h4>Date:&nbsp;</h4>
              <p>{requestD?.date}</p>
              <h4>&emsp;Time:&nbsp;</h4>
              <p>{requestD?.time}</p>
            </div>
            <hr className="divider" />
            <div className="detail-phone">
              <h4>Description:&emsp;</h4>
              <p>
                Unit: {requestD?.problemDesc[0].unit}&emsp; operation:{" "}
                {requestD?.problemDesc[0].operation}&emsp;
              </p>
            </div>

            <div className="detail-phone">
              <h4>Notes:&emsp;</h4>
              <p> {requestD?.notes}</p>
            </div>
            <hr className="divider" />
            <div className="detail-phone">
              <h4>Status:&emsp;</h4>
              <p
                style={{
                  color:
                    requestD.status == "pending"
                      ? "blue"
                      : requestD.status == "done"
                      ? "green"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {requestD?.status}
                &emsp;
              </p>
              {requestD?.status === "pending" && (
                <>
                  <button className="btn-status" onClick={onDone}>
                    Done
                  </button>
                  <button className="btn-status" onClick={onCancel}>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
