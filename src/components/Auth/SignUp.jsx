import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import logo from "../../logo.svg";
import authstore from "../../store/authStore";
import { observer } from "mobx-react";
import Swal from "sweetalert2";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    type: "",
  });
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    authstore.signUp(user, Swal, navigate);
  };

  return (
    <header hidden={true} className="App-header" id="signUp">
      <img src={logo} className="App-logo2" alt="logo" />
      <h1>Sign Up</h1>
      <div className="form-container">
        <Form onSubmit={handleSubmit} className="form">
          <Form.Group className="form-control">
            <Form.Label className="form-label">
              <Icon.PersonCircle /> &nbsp; Username
            </Form.Label>

            <Form.Control
              name="username"
              value={user.username}
              type="text"
              placeholder="Enter Username"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="form-control">
            <Form.Label className="form-label">
              <Icon.Key />
              &nbsp; Password
            </Form.Label>
            <Form.Control
              name="password"
              value={user.password}
              type="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="form-control">
            <Form.Label className="form-label">
              <Icon.Key />
              &nbsp; Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(value) => setConfirmPassword(value)}
            />
          </Form.Group>
          <Form.Group className="form-control">
            <Form.Label className="form-label">
              <Icon.Key />
              &nbsp; Email
            </Form.Label>
            <Form.Control
              name="email"
              value={user.email}
              type="text"
              placeholder="Enter Email"
              onChange={handleChange}
            />
          </Form.Group>
          <FormControl>
            <p className="form-label">Type of User</p>
            <RadioGroup
              name="type"
              className="checkbox"
              value={user.type}
              onChange={handleChange}
            >
              <FormControlLabel
                value="worker"
                name="type"
                className="form-label"
                control={<Radio />}
                label="Worker"
              />
              <FormControlLabel
                value="admin"
                name="type"
                control={<Radio />}
                label="Admin"
              />
            </RadioGroup>
          </FormControl>
        </Form>
      </div>
      <button className="btn" onClick={handleSubmit}>
        Sign Up
      </button>
    </header>
  );
};

export default observer(SignUp);
