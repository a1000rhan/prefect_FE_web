import React, { useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import profileStore from "../../store/profileStore";
import requestStore from "../../store/requestsStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import * as Icon from "react-bootstrap-icons";
import Swal from "sweetalert2";

const UpdateRequestProblem = ({ updateRequest, setUpdateRequest }) => {
  profileStore.loading && <h1>loading</h1>;
  const [problemDesc, setProblemDesc] = useState({
    operation: updateRequest.problemDesc[0]?.operation,
    unit: updateRequest.problemDesc[0]?.unit,
  });

  const [updateStatus, setUpdateStatus] = useState(updateRequest.status);
  const [theWorker, setWorker] = useState("");
  const navigate = useNavigate();

  const workersName = profileStore.workers.map((worker) => (
    <option value={worker._id}>{worker.firstName}</option>
  ));

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

    console.log(
      "🚀 ~ file: UpdateRequestProblem.jsx ~ line 44 ~ handleSubmit ~ allData",
      allData
    );
    requestStore.updateRequest(allData, theWorker, navigate, Swal);
  };
  return (
    <>
      <div className="bk">
        <header className="App-header">
          <Icon.ArrowLeft
            onClick={() => navigate(-1)}
            size={30}
            className="top-icon"
          />
          <h1>Update Request</h1>
        </header>
        <div className="container">
          <form className="requst-form" onSubmit={handleSubmit}>
            <div className="felids">
              <label className="labelT">The Problem</label>
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
                  label="Split Unit"
                />

                <FormControlLabel
                  value="central"
                  name="problem2"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label="Central Unit"
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
                  label="Maintenance"
                />

                <FormControlLabel
                  value="Installing"
                  name="operation"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label="Installing"
                />
              </RadioGroup>

              <br />
              <label className="labelT">Problem Description</label>
              <textarea
                className="textF"
                name="notes"
                value={updateRequest.notes}
                onChange={handleChange}
              />
              <br />
              <label className="labelT">Worker</label>
              <select onChange={(e) => setWorker(e.target.value)}>
                <option value="select">select</option>
                {workersName}
              </select>
              <br />
              <br />

              <label className="labelT">Status:</label>

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
                  label="Cancel"
                />

                <FormControlLabel
                  value="done"
                  name="done"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label="Done"
                />

                <FormControlLabel
                  value="pending"
                  name="pending"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label="Pending"
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
