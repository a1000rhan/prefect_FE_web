import { Button, Card } from "@mui/material";
import React, { useState, useRef } from "react";
import authstore from "../../store/authStore";
import profileStore from "../../store/profileStore";
import requestStore from "../../store/requestsStore";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import * as Icon from "react-bootstrap-icons";
import { MenuItem, Menu } from "@mui/material";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

import pdfReceipt from "../../store/pdfReceipt";
import Signature from "../Additonal/Signature";
const RequestItem = ({ request }) => {
  if (profileStore.loading || authstore.loading || requestStore.loading)
    <h1>loading</h1>;
  const { t, i18n } = useTranslation();

  let sigPad = useRef(null);
  const [show, setShow] = useState(false);
  const [sign, setSign] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    requestStore.removeRequest(request, navigate, Swal, setIsLoading);
  };
  let conditon =
    request.status === "done"
      ? t("done")
      : request.status === "canceled"
      ? t("cancel")
      : request.status === "pending"
      ? t("pending")
      : null;
  const onDone = (e) => {
    e.preventDefault();
    // setShow(true);
    pdfReceipt.pdfFunction(request, setFilePdf);

    request.status = "done";
  };
  const onCancel = (e) => {
    e.preventDefault();
    request.status = "canceled";
    requestStore.cancelRequest(request);
    requestStore.updateRequest(request, navigate, "", Swal);
  };
  const handleDownload = (e) => {
    e.preventDefault();
    <a href={filePdf} target="_blank"></a>;
  };
  const tConvert = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  };

  return (
    <div className="reqs">
      <div className="card-req">
        <div className="card-header">
          <Link className="req-link" to={`/requests/${request.slug}`}>
            <p className="reqItem-text">{request?.customerName}</p>
            <div className="row-req-items">
              <p className="reqItem-sub-text">
                {t("date")}: {request?.date}
              </p>

              <p className="reqItem-sub-text">
                {t("time")}: {tConvert(request?.time)}
              </p>
            </div>
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
              <MenuItem>{t("editRequest")}</MenuItem>
            </Link>
            <MenuItem onClick={handleDelete}>{t("deleteRequest")}</MenuItem>
          </Menu>
        </div>
        <div className="ro">
          <p className="subtitle">
            {t("status")}:
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
              &nbsp; {conditon}
            </span>
          </p>
          <div className="ic-end">
            {request?.status === "pending" ? (
              <>
                <Signature
                  setSign={setSign}
                  sigPad={sigPad}
                  show={show}
                  setShow={setShow}
                />
                <Icon.CheckCircle
                  style={{ marginLeft: 10 }}
                  size={30}
                  color="green"
                  onClick={onDone}
                />

                <Icon.XCircle
                  style={{ marginLeft: 10 }}
                  size={30}
                  color="red"
                  onClick={onCancel}
                />
              </>
            ) : (
              <>
                {request?.status === "done" ? (
                  <>
                    <a href={filePdf} target="_blank">
                      {t("invoice")}
                    </a>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(RequestItem);
