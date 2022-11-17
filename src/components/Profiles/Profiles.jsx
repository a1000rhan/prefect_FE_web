import React, { Suspense, useEffect, useState } from "react";
import profileStore from "../../store/profileStore";
import { observer } from "mobx-react";
import ProfileItem from "./ProfileItem";
import requestStore from "../../store/requestsStore";
import { useTranslation } from "react-i18next";
import PieChart from "../Additonal/PieChart";
import authstore from "../../store/authStore";
import { CircularProgress, Avatar } from "@mui/material";
import { Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Profiles = () => {
  if (profileStore.loading || requestStore.loading) {
    <div>
      <Spinner animation="border" role="status" />
    </div>;
  }

  const navigate = useNavigate();

  const [pendingState, setPendingState] = useState(<></>);
  const [doneState, setDoneState] = useState(<></>);
  const [cancelState, setCancelState] = useState(<></>);

  const [isLoading, setIsLoading] = useState(true);
  if (authstore.user?.type !== "admin") {
    navigate("/");
  }
  const repeSkeleton = [0, 0, 0, 0, 0];
  useEffect(() => {
    async function makeRequest() {
      const pending = requestStore.requests.filter(
        (req) => req.status === "pending"
      );
      const done = requestStore.requests.filter((req) => req.status === "done");
      const cancel = requestStore.requests.filter(
        (req) => req.status === "cancel"
      );

      setPendingState(pie(pending, "pending"));
      setDoneState(pie(done, "done"));
      setCancelState(pie(cancel, "cancel"));

      setIsLoading(false);
    }

    makeRequest();
  }, []);

  //TODO the numbers Are not fetching from the database
  const pie = (number, name) => {
    return <PieChart number={number.length} name={name} />;
  };

  const { t, i18n } = useTranslation();
  const theProfiles = profileStore.workers.map((profile) => (
    <ProfileItem key={profile._id} profile={profile} />
  ));
  const skelton = repeSkeleton.map((profile) => (
    <>
      <Card className="card-detail">
        <div className="link-detail">
          <div className="circle"></div>
          <div className="profile-item">
            <div className="text-sk"></div>
            <div className="text-sk"></div>
          </div>
        </div>
      </Card>
    </>
  ));

  return (
    <>
      {profileStore.loading || requestStore.loading ? (
        <>
          <header className="App-header">
            <div>
              <div className="text-sk"></div>
              <div className="text-sk"></div>
            </div>
          </header>
          <div className="profile-container">
            <div className="ro-charts">
              <div className="circle ch"></div>
              <div className="circle ch"></div>
              <div className="circle ch"></div>
            </div>
            {skelton}
          </div>
        </>
      ) : (
        <>
          <div className="bk">
            <header className="App-header">
              <div>
                <h1>{t("profile")}</h1>
                <h6>Welcome {authstore?.user?.username}</h6>
              </div>
            </header>

            <div className="charts">
              <Suspense fallback={<CircularProgress />}>
                {isLoading ? (
                  <div>
                    <CircularProgress />
                  </div>
                ) : null}
                {pendingState}
                {doneState}
                {cancelState}
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
