import React from "react";
import profileStore from "../../store/profileStore";
import { observer } from "mobx-react";
import ProfileItem from "./ProfileItem";
import requestStore from "../../store/requestsStore";

const Profiles = () => {
  if (profileStore.loading || requestStore.loading) {
    <h1>loading</h1>;
  }

  const theProfiles = profileStore.workers.map((profile) => (
    <ProfileItem key={profile._id} profile={profile} />
  ));

  return (
    <>
      <div className="bk">
        <header className="App-header">
          <h1>profiles</h1>
        </header>
        <div className="profile-container">{theProfiles}</div>
      </div>
    </>
  );
};

export default observer(Profiles);
