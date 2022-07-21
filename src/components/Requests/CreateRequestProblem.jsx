import React, { useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import profileStore from "../../store/profileStore";
import requestStore from "../../store/requestsStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import * as Icon from "react-bootstrap-icons";
import Swal from "sweetalert2";

const CreateRequestProblem = ({ request, setRequest }) => {
  console.log(
    "🚀 ~ file: CreateRequestProblem.jsx ~ line 9 ~ CreateRequestProblem ~ request",
    request
  );
  profileStore.loading && <h1>loading</h1>;
  const [problemDesc, setProblemDesc] = useState({
    operation: "",
    unit: "",
  });

  const [theWorker, setWorker] = useState("");
  const navigate = useNavigate();

  const workersName = profileStore.workers.map((worker) => (
    <option value={worker._id}>{worker.firstName}</option>
  ));

  const handleChange = (event) => {
    setRequest({ ...request, [event.target.name]: event.target.value });
  };
  const handleChangeOperation = (event) => {
    setProblemDesc({ ...problemDesc, operation: event.target.value });
  };
  const handleChangeUnit = (event) => {
    setProblemDesc({ ...problemDesc, unit: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const allData = { ...request, problemDesc: problemDesc };

    requestStore.createNewRequests(allData, theWorker, navigate, Swal);
    setRequest({
      customerName: "",
      customerAddress: {},
      customerPhone: "",
      time: "",
      date: "",
      notes: "",
      problemDesc: {},
    });
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
          <h1>Create Request</h1>
        </header>
        <div className="container">
          <form className="requst-form" onSubmit={handleSubmit}>
            <div className="felids">
              <label className="labelT">The Problem</label>
              <br />
              <RadioGroup
                name="unit"
                className="checkbox2"
                onChange={handleChangeUnit}
              >
                <FormControlLabel
                  value="split"
                  name="unit"
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
                  name="problemDesc"
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
                value={request.notes}
                onChange={handleChange}
              />
              <br />
              <label className="labelT">Worker</label>
              <select onChange={(e) => setWorker(e.target.value)}>
                <option required>select</option>
                {workersName}
              </select>
            </div>
          </form>
          <button className="btns" onClick={handleSubmit}>
            Create Request
          </button>
        </div>
      </div>
    </>
  );
};

export default observer(CreateRequestProblem);
