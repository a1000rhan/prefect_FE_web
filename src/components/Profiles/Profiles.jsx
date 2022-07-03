import React from "react";
import profileStore from "../../store/profileStore";
import { observer } from "mobx-react";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  if (profileStore.loading) {
    <h1>loading</h1>;
  }

  const theProfiles = profileStore.workers.map((profile) => (
    <ProfileItem key={profile._id} profile={profile} />
  ));

  return (
    <>
      <header className="App-header">
        <h1>profiles</h1>
      </header>
      <div className="bk">
        <div className="profile-container">{theProfiles}</div>
      </div>
    </>
  );
};

export default observer(Profiles);
