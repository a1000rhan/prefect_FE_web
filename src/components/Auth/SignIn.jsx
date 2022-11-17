import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../logo.svg";
import authstore from "../../store/authStore";
import { observer } from "mobx-react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";

const SignIn = () => {
  const { t, i18n } = useTranslation();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    authstore.signIn(user, Swal, navigate, setIsLoading);
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
        <h1 className="perfect-title">{t("signin")}</h1>
        <hr className="divider" />
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
                disabled={isLoading}
                placeholder={t("pUsername")}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Label className="form-label">
              <Icon.Key />
              &nbsp; {t("password")}
            </Form.Label>
            <div
              className="form-controls"
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Form.Control
                name="password"
                style={{ height: "40px" }}
                value={user.password}
                type={showPassword ? "text" : "password"}
                placeholder={t("pPassword")}
                disabled={isLoading}
                onChange={handleChange}
              />

              <div style={{ marginLeft: "10px" }}>
                {showPassword ? (
                  <Icon.Eye onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <Icon.EyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
          </Form>
          <hr className="divider" />
          <button className="btns" onClick={handleSubmit}>
            {isLoading ? <CircularProgress /> : <> {t("signin")}</>}
          </button>
          <p className="under-sign">
            {t("notSignup")}
            <Link to="/signup" className="under-sign-link">
              <span> {t("signup")}</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default observer(SignIn);
