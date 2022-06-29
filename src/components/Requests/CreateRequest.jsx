import React, { useState } from "react";
import TimeDate from "./TimeDate";
import { useNavigate } from "react-router-dom";
import profileStore from "../../store/profileStore";

const CreateRequest = ({ request, setRequest }) => {
  const [time, setTime] = useState({
    minutes: 0,
    hours: 1,
  });
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleChange = (event) => {
    setRequest({ ...request, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    setRequest({
      ...request,
      time: time,
      date: date,
    });
    profileStore.fetchWorkersProfiles();
    navigate("/requests/createRequest/2");
  };

  return (
    <>
      <header className="App-header">
        <h1>Create Request</h1>
      </header>
      <div className="bk">
        <div className="container">
          <form className="requst-form" onSubmit={handleSubmit}>
            <div className="felids">
              <label className="labelT">Customer Name</label>
              <input
                className="textF"
                value={request.customerName}
                type="text"
                name="customerName"
                onChange={handleChange}
                autoFocus={true}
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
          </form>
          <div className="center">
            <button className="btn" onClick={handleSubmit}>
              create Request
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRequest;
