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
    <div className="bk">
      <div className="App">
        <img src={logo} className="App-logo2" alt="logo" />
        <h1 className="title">Sign Up</h1>
      </div>
      <div className="container">
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
            <h3>Type of User</h3>
            <RadioGroup name="type" value={user.type} onChange={handleChange}>
              <div className="checkbox">
                <FormControlLabel
                  value="worker"
                  name="type"
                  control={<Radio sx={{ color: "white" }} />}
                  label="Worker"
                />
                <FormControlLabel
                  value="admin"
                  name="type"
                  control={<Radio sx={{ color: "white" }} />}
                  label="Admin"
                />
              </div>
            </RadioGroup>
          </Form>
        </div>
        <button className="btn" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default observer(SignUp);
