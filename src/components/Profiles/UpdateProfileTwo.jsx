import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../logo.svg";
import { observer } from "mobx-react";
import authstore from "../../store/authStore";
import profileStore from "../../store/profileStore";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const UpdateProfileTwo = ({ profile, setProfile }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const [previewImage, setPreviewImage] = useState("");
  const { t, i18n } = useTranslation();

  const handleImage = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    setProfile({ ...profile, image: event.target.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    profileStore.updateProfile(profile, Swal, navigate);
  };

  return (
    <div className="bk">
      <div className="App">
        <img src={logo} className="App-logo2" alt="logo" />
        <div className="update-profile-header">
          <Icon.ArrowLeft
            onClick={() => navigate(-1)}
            size={30}
            className="top-icon"
          />
          <h1>Update Profile</h1>
        </div>
      </div>
      <hr className="divider" />

      <div className="container">
        <div className="form-container">
          <Form onSubmit={handleSubmit} className="form">
            <Form.Group className="form-controls">
              <Form.Label className="form-label">
                <Icon.PersonCircle /> &nbsp; {t("civilId")}
              </Form.Label>

              <Form.Control
                name="civilId"
                value={profile.civilId}
                type="number"
                max={13}
                placeholder="Enter your First Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="form-controls">
              <Form.Label className="form-label">
                <Icon.Key />
                &nbsp; {t("age")}
              </Form.Label>
              <Form.Control
                name="age"
                value={profile.age}
                type="text"
                placeholder="Enter your Last Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="form-controls">
              <Form.Label className="form-label">
                <Icon.Key />
                &nbsp; {t("address")}
              </Form.Label>

              <Form.Control
                name="address"
                value={profile.address}
                type="text"
                placeholder="Enter your Phone Number"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="form-control2">
              <Form.Label className="form-label">
                <Icon.Image />
                &nbsp; {t("image")}
              </Form.Label>
              <Form.Control type="file" onChange={handleImage} />
              <img
                className="img-thumbnail"
                src={previewImage}
                alt="profile"
                accept="image/*"
              />
            </Form.Group>
          </Form>
        </div>
        <hr className="divider" />
        <button className="btns" onClick={handleSubmit}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default observer(UpdateProfileTwo);
