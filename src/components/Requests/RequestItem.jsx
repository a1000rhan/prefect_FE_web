import { Button, Card } from "@mui/material";
import React, { useState } from "react";
import authstore from "../../store/authStore";
import profileStore from "../../store/profileStore";
import requestStore from "../../store/requestsStore";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import * as Icon from "react-bootstrap-icons";
import { MenuItem, Menu } from "@mui/material";

const RequestItem = ({ request }) => {
  if (profileStore.loading || authstore.loading || requestStore.loading)
    <h1>loading</h1>;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    requestStore.removeRequest(request, navigate);
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
          <p className="reqItem-sub-text">
            Phone Number: {request?.customerPhone}
          </p>
        </Link>

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
          <Link to={`/updateRequest/${request._id}`}>
            <MenuItem>Edit Request</MenuItem>
          </Link>
          <MenuItem onClick={handleDelete}>Delete Request</MenuItem>
        </Menu>
      </div>

      <Link className="req-link" to={`/requests/${request.slug}`}>
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
        </p>
        {request?.status === "pending" && (
          <>
            <button className="btn-status" onClick={onDone}>
              Done
            </button>
            <button className="btn-status" onClick={onCancel}>
              Cancel
            </button>
          </>
        )}
      </Link>
    </Card>
  );
};

export default observer(RequestItem);
