import React, { useState } from "react";
import TimeDate from "./TimeDate";
import { useNavigate } from "react-router-dom";
import profileStore from "../../store/profileStore";
import * as Icon from "react-bootstrap-icons";

const UpdateRequest = ({ request, setRequest }) => {
  const [time, setTime] = useState({
    minutes: 0,
    hours: 1,
  });
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState({
    house: "",
    street: "",
    city: "",
    block: "",
    apartment: "",
    floor: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setRequest({ ...request, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    console.log(address);
    setRequest({
      ...request,
      customerAddress: address,
      time: time,
      date: date,
    });
    profileStore.fetchWorkersProfiles();
    navigate("/requests/createRequest/2");
  };

  return (
    <>
      <header className="App-header">
        <Icon.ArrowLeft
          onClick={() => navigate(-1)}
          size={30}
          className="top-icon"
        />

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
              <div className="addressB">
                <p className="addressL">house:</p>
                <input
                  className="addressF"
                  value={address.house}
                  type="text"
                  name="house"
                  onChange={(e) =>
                    setAddress({ ...address, house: e.target.value })
                  }
                />
                <p className="addressL">Street:</p>
                <input
                  value={address.street}
                  type="text"
                  name="street"
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className="addressF"
                />
                <p className="addressL">Block:</p>
                <input
                  value={address.block}
                  type="text"
                  name="block"
                  onChange={(e) =>
                    setAddress({ ...address, block: e.target.value })
                  }
                  className="addressF"
                />
                <p className="addressL">City:</p>
                <input
                  value={address.city}
                  type="text"
                  name="city"
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  style={{ width: "100px", margin: "5px" }}
                />
                <div></div>
                <p className="addressL">Apt:</p>
                <input
                  value={address.apartment}
                  type="text"
                  name="apartment"
                  onChange={(e) =>
                    setAddress({ ...address, apartment: e.target.value })
                  }
                  className="addressF"
                />
                <p className="addressL">floor:</p>
                <input
                  className="addressF"
                  value={address.floor}
                  type="text"
                  name="floor"
                  onChange={(e) =>
                    setAddress({ ...address, floor: e.target.value })
                  }
                />
              </div>
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

export default UpdateRequest;
