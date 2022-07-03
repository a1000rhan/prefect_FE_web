import React from "react";
import { Card } from "react-bootstrap";
import authstore from "../../store/authStore";
import profileStore from "../../store/profileStore";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

const ProfileItem = ({ profile }) => {
  profileStore.loading && <h1>Loading</h1>;
  authstore.loading && <h1>loading</h1>;
  return (
    <Link className="link-detail" to={`/profiles/${profile._id}`}>
      <Card className="card-detail">
        <Avatar />
        <div className="profile-item">
          <p className="profile-label">
            {profile.firstName} {profile.lastName}
          </p>
          <p>
            <span>Age: {profile.age}</span>
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default ProfileItem;
