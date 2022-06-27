import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import { observer } from "mobx-react";
import authstore from "../../store/authStore";

const UpdateProfile = ({ profile, setProfile }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // profileStore.updateProfile(profile);
    navigate("/updateProfiles2");
  };

  return (
    <div className="App-header">
      <img src={logo} className="App-logo2" alt="logo" />
      <h1>Update Profile</h1>
      <hr className="divider" />
      <div className="form-container">
        <Form onSubmit={handleSubmit} className="form">
          <Form.Group className="form-control">
            <Form.Label className="form-label">
              <Icon.PersonCircle /> &nbsp; first Name
            </Form.Label>

            <Form.Control
              name="firstName"
              value={profile.firstName}
              type="text"
              placeholder="Enter your First Name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="form-control">
            <Form.Label className="form-label">
              <Icon.Key />
              &nbsp; Last Name
            </Form.Label>
            <Form.Control
              name="lastName"
              value={profile.lastName}
              type="text"
              placeholder="Enter your Last Name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="form-control">
            <Form.Label className="form-label">
              <Icon.Telephone />
              &nbsp; Phone Number
            </Form.Label>
            <Form.Control
              name="phoneNumber"
              value={profile.phoneNumber}
              type="text"
              placeholder="Enter your Phone Number"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="form-control">
            <Form.Label className="form-label">
              <Icon.Bag />
              &nbsp; Position
            </Form.Label>
            <Form.Control
              name="position"
              value={profile.position}
              type="text"
              placeholder="Enter your Position"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </div>
      <hr className="divider" />

      <button className="btn" onClick={handleSubmit}>
        Update Profile
      </button>
    </div>
  );
};

export default observer(UpdateProfile);
