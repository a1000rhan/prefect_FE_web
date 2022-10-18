import React, { useState, useEffect } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import profileStore from "../../store/profileStore";
import requestStore from "../../store/requestsStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import * as Icon from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Chip from "@mui/material/Chip";

const UpdateRequestProblem = ({ updateRequest, setUpdateRequest }) => {
  profileStore.loading && <h1>loading</h1>;
  const [problemDesc, setProblemDesc] = useState({
    operation: updateRequest?.problemDesc[0]?.operation,
    unit: updateRequest?.problemDesc[0]?.unit,
  });

  const [updateStatus, setUpdateStatus] = useState(updateRequest.status);
  const [theWorker, setWorker] = useState(
    profileStore.workers.map((worker) =>
      worker.requests.some((req) => req._id == updateRequest._id)
    )
  );
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isCheck = profileStore.workers.map((worker) =>
    worker.requests.some((req) => req._id == updateRequest._id)
  );

  // Return classes based on whether item is checked
  const workersName = profileStore?.workers.map((worker, index) => (
    <option key={index} value={worker._id}>
      {worker.firstName}
    </option>
  ));
  const handleCheck = (e, index) => {
    setChecked(e.target.checked ? !checked : checked);
    console.log(
      "🚀 ~ file: UpdateRequestProblem.jsx ~ line 35 ~ handleCheck ~ index",
      index,
      checked,
      e.target.checked,
      isCheck[index]
    );
  };
  const handleClick = (index) => {
    setChecked(!checked[index]);
    console.log(checked);
    isCheck[index] = checked;
  };
  const workersNameBox = profileStore?.workers.map((worker, index) => (
    <div>
      <Chip
        label={worker.firstName + " " + worker.lastName}
        key={index}
        onClick={() => handleClick(index)}
        color={checked[index] ? "primary" : "secondary"}
      />
    </div>
  ));

  //checkbox input in reactjs?
  const handleChange = (event) => {
    setUpdateRequest({
      ...updateRequest,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeOperation = (event) => {
    setProblemDesc({
      ...problemDesc,
      operation: event.target.value,
    });
  };
  const handleChangeUnit = (event) => {
    setProblemDesc({
      ...problemDesc,
      unit: event.target.value,
    });
  };

  const handleStatus = (event) => {
    setUpdateStatus(event.target.value);
  };

  const handleSubmit = () => {
    const allData = {
      ...updateRequest,
      problemDesc: problemDesc,
      status: updateStatus,
    };
    requestStore.updateRequest(allData, theWorker, navigate, Swal);
  };
  return (
    <>
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
          <h1>{t("updateRequest")}</h1>
        </header>
        <div className="container">
          <form className="requst-form" onSubmit={handleSubmit}>
            <div className="felids">
              <label className="labelT">{t("problem")}</label>
              <br />
              <RadioGroup
                name="unit"
                value={problemDesc.unit}
                className="checkbox2"
                onChange={handleChangeUnit}
              >
                <FormControlLabel
                  name="unit"
                  value="split"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label={t("split")}
                />

                <FormControlLabel
                  value="central"
                  name="problem2"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label={t("central")}
                />
              </RadioGroup>
              <RadioGroup
                name="operation"
                value={problemDesc.operation}
                className="checkbox3"
                onChange={handleChangeOperation}
              >
                <FormControlLabel
                  value="Maintenance"
                  name="operation"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label={t("maintenance")}
                />

                <FormControlLabel
                  value="Installing"
                  name="operation"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label={t("installing")}
                />
              </RadioGroup>

              <br />
              <label className="labelT">{t("problemDescription")}</label>
              <textarea
                className="textF"
                name="notes"
                value={updateRequest.notes}
                onChange={handleChange}
              />
              <br />
              <label className="labelT">Worker</label>

              <select
                className="dropdown-worker"
                onChange={(e) => setWorker(e.target.value)}
              >
                <option value="select">select</option>
                {workersName}
              </select>

              <br />
              <br />

              <label className="labelT">{t("status")}:</label>

              <RadioGroup
                name="status"
                value={updateStatus}
                onChange={handleStatus}
                className="checkbox3"
              >
                <FormControlLabel
                  value="cancel"
                  name="cancel"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label={t("cancel")}
                />

                <FormControlLabel
                  value="done"
                  name="done"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label={t("done")}
                />

                <FormControlLabel
                  value="pending"
                  name="pending"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label={t("pending")}
                />
              </RadioGroup>
            </div>
          </form>
          <button className="btns" onClick={handleSubmit}>
            Update the Request
          </button>
        </div>
      </div>
    </>
  );
};

export default observer(UpdateRequestProblem);
