import { Card } from "@mui/material";
import React, { useState } from "react";
import authstore from "../../store/authStore";
import profileStore from "../../store/profileStore";
import requestStore from "../../store/requestsStore";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import * as Icon from "react-bootstrap-icons";
import { MenuItem, Menu } from "@mui/material";

const RequestItem = ({ request }) => {
  if (profileStore.loading || authstore.loading || requestStore.loading)
    <h1>loading</h1>;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDone = (e) => {
    e.preventDefault();
    request.status = "done";
    requestStore.updateRequest(request);
  };
  const onCancel = (e) => {
    e.preventDefault();
    request.status = "canceled";
    requestStore.updateRequest(request);
  };

  return (
    <Card className="card">
      <div className="card-header">
        <Link className="req-link" to={`/requests/${request.slug}`}>
          <p className="reqItem-text">{request?.customerName}</p>
        </Link>
        <Icon.ThreeDots style={{ zIndex: "20" }} onClick={handleClick} />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Edit Request</MenuItem>
          <MenuItem onClick={handleClose}>Delete Request</MenuItem>
        </Menu>
      </div>
      <Link className="req-link" to={`/requests/${request.slug}`}>
        <p className="reqItem-sub-text">
          Phone Number: {request?.customerPhone}
        </p>
        <p>
          status:
          <span
            style={{
              color:
                request.status == "pending"
                  ? "blue"
                  : request.status == "done"
                  ? "green"
                  : "red",
              fontWeight: "bold",
            }}
          >
            &nbsp; {request?.status}
          </span>
          {request?.status === "pending" && (
            <>
              <button onClick={onDone}>Done</button>
              <button onClick={onCancel}>Cancel</button>
            </>
          )}
        </p>
      </Link>
    </Card>
  );
};

export default observer(RequestItem);
