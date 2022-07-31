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
    <Card className="card-detail">
      <Link className="link-detail" to={`/profiles/${profile._id}`}>
        <Avatar
          src={profile?.image}
          sx={{
            width: "60px",
            height: "60px",
            border: "1px solid #000",
          }}
        />
        <div className="profile-item">
          <p className="profile-label">
            {profile.firstName} {profile.lastName}
          </p>
          <p>
            <span>{profile.position}</span>
          </p>
        </div>
      </Link>
    </Card>
  );
};

export default ProfileItem;
