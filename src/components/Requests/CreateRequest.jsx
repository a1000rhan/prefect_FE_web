import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import requestStore from "../../store/requestsStore";
import TimeDate from "./TimeDate";
import { useNavigate } from "react-router-dom";

const CreateRequest = () => {
  const [request, setRequest] = useState({
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    time: "",
    date: "",
    notes: "",
    problemDesc: {},
  });
  const [problemDesc, setProblemDesc] = useState({
    operation: "",
    unit: "",
  });
  const [time, setTime] = useState({
    minutes: 0,
    hours: 1,
  });
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

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
    console.log(time, date);
    const all = {
      ...request,
      time: time,
      date: date,
      problemDesc: problemDesc,
    };
    console.log(all);
    requestStore.createNewRequests(all, navigate);
  };

  return (
    <div className="App-header">
      <h1>Create Request</h1>
      <div>
        <form className="requst-form" onSubmit={handleSubmit}>
          <div className="felids">
            <label className="labelT">Customer Name</label>
            <input
              className="textF"
              value={request.customerName}
              type="text"
              name="customerName"
              onChange={handleChange}
            />
            <label className="labelT">Customer Address</label>
            <input
              className="textF"
              value={request.customerAddress}
              type="text"
              name="customerAddress"
              onChange={handleChange}
            />
            <label className="labelT">Customer Phone Number</label>
            <input
              className="textF"
              value={request.customerPhone}
              type="text"
              name="customerPhone"
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label className="labelT">The date</label>
            <TimeDate
              setTime={setTime}
              time={time}
              setDate={setDate}
              date={date}
            />
          </div>
          <br />
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
          </div>
        </form>
        <div className="center">
          <button className="btn" onClick={handleSubmit}>
            create Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;
