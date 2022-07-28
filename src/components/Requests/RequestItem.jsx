import { Button, Card } from "@mui/material";
import React, { useState } from "react";
import authstore from "../../store/authStore";
import profileStore from "../../store/profileStore";
import requestStore from "../../store/requestsStore";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import * as Icon from "react-bootstrap-icons";
import { MenuItem, Menu } from "@mui/material";
import Swal from "sweetalert2";

import pdfReceipt from "../../store/pdfReceipt";
const RequestItem = ({ request }) => {
  if (profileStore.loading || authstore.loading || requestStore.loading)
    <h1>loading</h1>;

  const [filePdf, setFilePdf] = useState(request.receipt);
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
    requestStore.removeRequest(request, navigate, Swal);
  };

  const onDone = (e) => {
    e.preventDefault();
    pdfReceipt.pdfFunction(request, setFilePdf);
  };
  const onCancel = (e) => {
    e.preventDefault();
    request.status = "canceled";
    requestStore.cancelRequest(request);
    // requestStore.updateRequest(request, navigate, "", Swal);
  };

  return (
    <div className="">
      <div className="card">
        <div className="card-header">
          <Link className="req-link" to={`/requests/${request.slug}`}>
            <p className="reqItem-text">{request?.customerName}</p>
            <p className="reqItem-sub-text">date: {request?.date}</p>
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
            <Link
              className="dropdown-menu1"
              to={`/updateRequest/${request._id}`}
            >
              <MenuItem>Edit Request</MenuItem>
            </Link>
            <MenuItem onClick={handleDelete}>Delete Request</MenuItem>
          </Menu>
        </div>

        <Link className="req-link" to={`/requests/${request.slug}`}>
          <p className="subtitle">
            status:
            <span
              style={{
                color:
                  request.status == "pending"
                    ? "blue"
                    : request.status == "done"
                    ? "green"
                    : "red",
              }}
            >
              &nbsp; {request?.status}
            </span>
          </p>
        </Link>
        {request?.status === "pending" ? (
          <>
            <button className="btn-status" onClick={onDone}>
              Done
            </button>
            <button className="btn-status" onClick={onCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            {requestStore.loading ? (
              <>
                <h1>loading</h1>
              </>
            ) : (
              <>
                <p className="subtitle">Receipt:</p>
                <a href={filePdf} target="_blank">
                  Download
                </a>
                <p>{filePdf}</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default observer(RequestItem);
