import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../logo.svg";
// import { observer } from "mobx-react";
import authstore from "../../store/authStore";
import profileStore from "../../store/profileStore";
import Swal from "sweetalert2";

const UpdateProfileTwo = ({ profile, setProfile }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    profileStore.updateProfile(profile, Swal, navigate);
    setProfile({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      position: "",
      civilId: "",
      age: "",
      address: "",
      image: "",
    });
  };

  return (
    <div className="bk">
      <div className="App">
        <img src={logo} className="App-logo2" alt="logo" />
        <h1>Update Profile</h1>
      </div>
      <hr className="divider" />

      <div className="container">
        <div className="form-container">
          <Form onSubmit={handleSubmit} className="form">
            <Form.Group className="form-control">
              <Form.Label className="form-label">
                <Icon.PersonCircle /> &nbsp; Civil Id
              </Form.Label>

              <Form.Control
                name="civilId"
                value={profile.civilId}
                type="number"
                placeholder="Enter your First Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="form-control">
              <Form.Label className="form-label">
                <Icon.Key />
                &nbsp; Age
              </Form.Label>
              <Form.Control
                name="age"
                value={profile.age}
                type="text"
                placeholder="Enter your Last Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="form-control">
              <Form.Label className="form-label">
                <Icon.Key />
                &nbsp; Address
              </Form.Label>
              <Form.Control
                name="address"
                value={profile.address}
                type="text"
                placeholder="Enter your Phone Number"
                onChange={handleChange}
              />
            </Form.Group>
            <input type={file} />
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

export default UpdateProfileTwo;
