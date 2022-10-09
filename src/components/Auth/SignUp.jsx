import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import logo from "../../logo.svg";
import authstore from "../../store/authStore";
import { observer } from "mobx-react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const { t, i18n } = useTranslation();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    type: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    console.log(
      "🚀 ~ file: SignUp.jsx ~ line 38 ~ handleChange ~ confirmPassword",
      confirmPassword
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
      });
    } else {
      authstore.signUp(user, Swal, navigate);
    }
  };

  return (
    <div className="bk">
      <div className="App">
        <Icon.Translate
          size={30}
          onClick={() => {
            if (i18n.language === "ar") {
              i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
              document
                .getElementsByTagName("html")[0]
                .setAttribute("dir", "ltr");
            } else {
              i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
              document
                .getElementsByTagName("html")[0]
                .setAttribute("dir", "rtl");
            }
          }}
        />
        <img src={logo} className="App-logo2" alt="logo" />
        <h1 className="perfect-title">{t("signup")}</h1>
        <p className="under-sign">
          {t("urSignin")}
          <Link to="/signin" className="under-sign-link">
            <span> {t("signin")}</span>
          </Link>
        </p>
      </div>
      <div className="container">
        <div className="form-container">
          <Form onSubmit={handleSubmit} className="form">
            <Form.Group className="form-controls">
              <Form.Label className="form-label">
                <Icon.PersonCircle /> &nbsp; {t("username")}
              </Form.Label>

              <Form.Control
                name="username"
                value={user.username}
                type="text"
                placeholder={t("pUsername")}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="form-controls">
              <Form.Label className="form-label">
                <Icon.Key />
                &nbsp; {t("password")}
              </Form.Label>
              <Form.Control
                name="password"
                value={user.password}
                type="password"
                placeholder={t("pPassword")}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="form-controls">
              <Form.Label className="form-label">
                <Icon.Key />
                &nbsp; {t("confirmPassword")}
              </Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(value) => setConfirmPassword(value.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-controls">
              <Form.Label className="form-label">
                <Icon.Key />
                &nbsp; {t("email")}
              </Form.Label>
              <Form.Control
                name="email"
                value={user.email}
                type="text"
                placeholder="Enter Email"
                onChange={handleChange}
              />
            </Form.Group>
            <h3>{t("type")}</h3>
            <RadioGroup name="type" value={user.type} onChange={handleChange}>
              <div className="checkbox">
                <FormControlLabel
                  value="worker"
                  name="type"
                  control={<Radio sx={{ color: "white" }} />}
                  label={t("worker")}
                />
                <FormControlLabel
                  value="admin"
                  name="type"
                  control={<Radio sx={{ color: "white" }} />}
                  label={t("admin")}
                />
              </div>
            </RadioGroup>
          </Form>
        </div>
        <button className="btns" onClick={handleSubmit}>
          {t("signup")}
        </button>
      </div>
    </div>
  );
};

export default observer(SignUp);
