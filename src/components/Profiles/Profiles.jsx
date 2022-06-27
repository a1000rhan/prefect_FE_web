import React from "react";
import profileStore from "../../store/profileStore";
import { observer } from "mobx-react";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  if (profileStore.loading) {
    <h1>loading</h1>;
  }
  const theProfiles = profileStore.profiles.map((profile) => (
    <ProfileItem key={profile._id} profile={profile} />
  ));

  return (
    <div className="App-header">
      <p>profiles</p>
      {theProfiles}
    </div>
  );
};

export default observer(Profiles);
