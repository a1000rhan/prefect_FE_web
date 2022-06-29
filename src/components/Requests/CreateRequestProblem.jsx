import React, { useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import profileStore from "../../store/profileStore";
import requestStore from "../../store/requestsStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";

const CreateRequestProblem = ({ request, setRequest }) => {
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
  const handleSubmit = () => {
    const allData = { ...request, problemDesc: problemDesc };

    requestStore.createNewRequests(allData, theWorker, navigate);
    setRequest({
      customerName: "",
      customerAddress: "",
      customerPhone: "",
      time: "",
      date: "",
      notes: "",
      problemDesc: {},
    });
  };
  return (
    <header className="App-header">
      <h1>Create Request</h1>
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
              control={<Radio />}
              label="Split Unit"
            />

            <FormControlLabel
              value="central"
              name="problem2"
              control={<Radio />}
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
              control={<Radio />}
              label="Maintenance"
            />

            <FormControlLabel
              value="Installing"
              name="problemDesc"
              control={<Radio />}
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
            <option>select</option>
            {workersName}
          </select>
        </div>
      </form>
      <button className="btn" onClick={handleSubmit}>
        Create Request
      </button>
    </header>
  );
};

export default observer(CreateRequestProblem);
