import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import { observer } from "mobx-react";
import authstore from "../../store/authStore";
import profileStore from "../../store/profileStore";

const UpdateProfile = ({ profile, setProfile }) => {
  if (authstore.loading || profileStore.loading) {
    <h1>loading</h1>;
  }
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
    <div className="bk">
      {(profileStore.loading || authstore.loading) && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      <div className="App">
        <img src={logo} className="App-logo2" alt="logo" />
        <div className="update-profile-header">
          <h1>Update Profile</h1>
        </div>
      </div>
      <hr className="divider" />
      <div className="container">
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
    </div>
  );
};

export default observer(UpdateProfile);
