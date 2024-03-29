import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import requestStore from "../../store/requestsStore";
import * as Icon from "react-bootstrap-icons";
import { MenuItem, Menu } from "@mui/material";
import authstore from "../../store/authStore";
import Swal from "sweetalert2";
import pdfReceipt from "../../store/pdfReceipt";
import { useTranslation } from "react-i18next";
import profileStore from "../../store/profileStore";

const RequestDetails = () => {
  const { slug } = useParams();
  const requestD = requestStore.requests.find(
    (request) => request.slug === slug
  );
  const [filePdf, setFilePdf] = useState(requestD?.receipt);

  const { t, i18n } = useTranslation();
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
    pdfReceipt.pdfFunction(requestD, setFilePdf);
  };
  const onCancel = (e) => {
    e.preventDefault();
    requestD.status = "canceled";
    requestStore.updateRequest(request, navigate, "", Swal);
  };
  const theWorkerRequests = profileStore.workers.filter((worker) => {
    const req = worker?.requests;
    return req.find((req) => req?._id === requestD?._id);
  });

  const showWorekers = theWorkerRequests.map((workerName, index) => (
    <div key={index}>
      <>
        {workerName.firstName} {workerName.lastName} -
      </>
    </div>
  ));

  const tConvert = (time) => {
    if (time === undefined) {
      return;
    }
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
  // }
  return (
    <div>
      <div className="bk">
        <header className="App-header">
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

          <h1>{t("requestDetails")}</h1>
        </header>
        <div className="details-container">
          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1>
                <Icon.PersonCircle />
                &emsp;
                {requestD?.customerName}
              </h1>
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
                  to={`/updateRequest/${requestD?._id}`}
                >
                  <MenuItem>{t("editRequest")}</MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>{t("deleteRequest")}</MenuItem>
              </Menu>
            </div>
            <div className="address-details">
              <h4>
                <Icon.GeoAltFill />
                &emsp;
              </h4>
              <>
                &nbsp;{t("house")}:&nbsp;
                {requestD?.customerAddress[0].house}, &nbsp;{t("street")}:&nbsp;
                {requestD?.customerAddress[0].street}, &nbsp;{t("block")}:&nbsp;
                {requestD?.customerAddress[0].block},
                <br />
                &nbsp;{t("apt")}:&nbsp;
                {requestD?.customerAddress[0].apartment}, &nbsp;{t("floor")}
                :&nbsp;
                {requestD?.customerAddress[0].floor}, &nbsp;{t("city")}:&nbsp;
                {requestD?.customerAddress[0].city}
              </>
            </div>
            <hr className="divider" />
            <div className="detail-phone">
              <h4>
                <Icon.TelephoneFill />
                &emsp;{" "}
              </h4>
              <a href="">{requestD?.customerPhone}</a>
            </div>
            <hr className="divider" />
            <div className="detail-date">
              <h4>
                {" "}
                <Icon.Calendar2Date />
                &emsp;{" "}
              </h4>
              <>{requestD?.date}</>
              <h4>
                &emsp; <Icon.Clock />: &emsp;
              </h4>
              <>{tConvert(requestD?.time)}</>
            </div>
            <hr className="divider" />
            <div className="detail-phone">
              <h4>
                {" "}
                <Icon.CardList />
                &emsp;
              </h4>
              <p>
                {t("unit")}: {t(requestD?.problemDesc[0].unit)}&emsp;{" "}
                {t("operation")}: {t(requestD?.problemDesc[0].operation)}
                &emsp;
              </p>
            </div>

            <div className="detail-phone">
              <h4>
                {" "}
                <Icon.JournalText />
                :&emsp;
              </h4>
              <> {requestD?.notes}</>
            </div>
            <div className="ro">
              <h4>
                {" "}
                <Icon.PersonWorkspace />
                :&emsp;
              </h4>

              {showWorekers}
            </div>
            <hr className="divider" />
            <div className="detail-phone">
              <h5>{t("status")}:&emsp;</h5>
              <p
                style={{
                  margin: 0,
                  color:
                    requestD?.status == "pending"
                      ? "blue"
                      : requestD?.status == "done"
                      ? "green"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {requestD?.status}
                &emsp;
              </p>
              {requestD?.status === "pending" ? (
                <>
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
                <></>
              )}
            </div>
            {requestD?.status === "done" && (
              <>
                <p className="subtitle">
                  {t("receipt")}:&emsp;
                  <a href={requestD?.receipt} target="_blank">
                    {t("downloadInvoicePDF")}
                  </a>
                </p>
              </>
            )}
            <div>
              <p className="createDate">
                Create date: {requestD?.createdAt.substring(0, 10)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
