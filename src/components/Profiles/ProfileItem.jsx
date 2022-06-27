import React from "react";
import authstore from "../../store/authStore";
import profileStore from "../../store/profileStore";

const ProfileItem = ({ profile }) => {
  profileStore.loading && <h1>Loading</h1>;
  authstore.loading && <h1>loading</h1>;
  return (
    <div>
      <p>{profile.firstName}</p>
      <p>{profile.lastName}</p>
    </div>
  );
};

export default ProfileItem;
