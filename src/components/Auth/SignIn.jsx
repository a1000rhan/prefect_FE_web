import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import authstore from "../../store/authStore";
import { observer } from "mobx-react";
import Swal from "sweetalert2";

const SignIn = () => {
  authstore.loading && <h1>loading</h1>;
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authstore.signIn(user, Swal, navigate);
  };

  return (
    <div className="bk">
      <div className="App">
        <img src={logo} className="App-logo2" alt="logo" />

        <h1>Sign In</h1>
      </div>

      <hr className="divider" />
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
          </Form>

          <hr className="divider" />
          <button className="btn" onClick={handleSubmit}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(SignIn);
