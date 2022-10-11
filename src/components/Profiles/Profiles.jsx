import React, { Suspense, useEffect, useState } from "react";
import profileStore from "../../store/profileStore";
import { observer } from "mobx-react";
import ProfileItem from "./ProfileItem";
import requestStore from "../../store/requestsStore";
import { useTranslation } from "react-i18next";
import PieChart from "../Additonal/PieChart";
import { Spinner } from "react-bootstrap";

const Profiles = () => {
  if (profileStore.loading || requestStore.loading) {
    <div>
      <Spinner animation="border" role="status" />
    </div>;
  }
  //TODO the numbers Are not fetching from the database
  const nPending = () => {
    return <PieChart number={5} name="Pending" />;
  };
  const nDone = () => {
    return <PieChart number={10} name="Done" />;
  };

  const { t, i18n } = useTranslation();
  const theProfiles = profileStore.workers.map((profile) => (
    <ProfileItem key={profile._id} profile={profile} />
  ));
  return (
    <>
      {profileStore.loading || requestStore.loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <div className="bk">
            <header className="App-header">
              <h1>{t("profile")}</h1>
            </header>

            <div className="charts">
              <Suspense fallback={<Spinner />}>
                {nPending()}
                {nDone()}
                <PieChart number={10} name="Cancel" />
              </Suspense>
            </div>
            <div className="profile-container">{theProfiles}</div>
          </div>
        </>
      )}
    </>
  );
};

export default observer(Profiles);
