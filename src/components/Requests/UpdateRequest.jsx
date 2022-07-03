import React, { useState } from "react";
import TimeDate from "./TimeDate";
import { useNavigate, useParams } from "react-router-dom";
import profileStore from "../../store/profileStore";
import * as Icon from "react-bootstrap-icons";
import requestStore from "../../store/requestsStore";

const UpdateRequest = ({ updateRequest, setUpdateRequest }) => {
  if (profileStore.loading || requestStore.loading) {
    <h1>loading</h1>;
  }
  const { requestId } = useParams();
  const request = requestStore.requests.find(
    (request) => request._id === requestId
  );
  setUpdateRequest(request);

  const [time, setTime] = useState({
    minutes: 0,
    hours: 1,
  });
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState({
    house: updateRequest?.customerAddress[0].house,
    street: updateRequest?.customerAddress[0].street,
    city: updateRequest?.customerAddress[0].city,
    block: updateRequest?.customerAddress[0].block,
    apartment: updateRequest?.customerAddress[0].apartment,
    floor: updateRequest?.customerAddress[0].floor,
  });
  const navigate = useNavigate();
  console.log(
    "🚀 ~ file: UpdateRequest.jsx ~ line 9 ~ UpdateRequest ~ updateRequest",
    updateRequest
  );

  const handleChange = (event) => {
    setUpdateRequest({
      ...updateRequest,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    console.log(updateRequest);
  };
  return (
    <>
      <header className="App-header">
        <Icon.ArrowLeft
          onClick={() => navigate(-1)}
          size={30}
          className="top-icon"
        />

        <h1>Update Request</h1>
      </header>
      <div className="bk">
        <div className="container">
          <form className="requst-form" onSubmit={handleSubmit}>
            <div className="felids">
              <label className="labelT">Customer Name</label>
              <input
                className="textF"
                value={updateRequest.customerName}
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
                value={updateRequest.customerPhone}
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
