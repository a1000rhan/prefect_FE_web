import "./App.css";
import "./components/Profiles/profile.css";
import "./components/Requests/requests.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-date-picker/dist/DatePicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import React, { useState, Suspense } from "react";
import { Route, Routes, useLocation, Router } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Requests from "./components/Requests/Requests";
import Profiles from "./components/Profiles/Profiles";
import UpdateProfile from "./components/Profiles/UpdateProfile";
import UpdateProfileTwo from "./components/Profiles/UpdateProfileTwo";
import OneProfile from "./components/Profiles/OneProfile";
import authstore from "./store/authStore";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import CreateRequest from "./components/Requests/CreateRequest";
import RequestDetails from "./components/Requests/RequestDetails";
import CreateRequestProblem from "./components/Requests/CreateRequestProblem";
import UpdateRequest from "./components/Requests/UpdateRequest";
import UpdateRequestProblem from "./components/Requests/UpdateRequestProblem";
import ProfileWorkerDetails from "./components/Profiles/ProfileWorkerDetails";
import profileStore from "./store/profileStore";
import { observer } from "mobx-react";
import "bootstrap/dist/css/bootstrap.min.css";
import PullToRefresh from "react-simple-pull-to-refresh";

import requestStore from "./store/requestsStore";

function App() {
  if (profileStore.loading) {
    <h1>loading</h1>;
  }
  const [showNav, setShowNav] = useState("none");
  const [profile, setProfile] = useState({
    firstName: profileStore.oneProfile?.firstName,
    lastName: profileStore.oneProfile?.lastName,
    phoneNumber: profileStore.oneProfile?.phoneNumber,
    position: profileStore.oneProfile?.position,
    civilId: profileStore.oneProfile?.civilId,
    age: profileStore.oneProfile?.age,
    address: profileStore.oneProfile?.address,
    image: profileStore.oneProfile?.image,
  });
  const [request, setRequest] = useState({
    customerName: "",
    customerAddress: {},
    customerPhone: "",
    time: "",
    date: "",
    notes: "",
    problemDesc: {},
  });
  const [updateRequest, setUpdateRequest] = useState({});

  const location = useLocation();

  const onRefresh = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        profileStore.fetchProfiles();
        requestStore.getAllRequests();
        resolve();
      }, 1000);
    });
  };

  return (
    <>
      <Navbar location={location} key={1} />
      <Suspense fallback="loading..">
        <PullToRefresh onRefresh={onRefresh}>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/one-profile" element={<OneProfile />} />

            <Route path="/requests" element={<Requests />} />
            <Route path="/requests/:slug" element={<RequestDetails />} />
            <Route
              path="/requests/createRequest"
              element={
                <CreateRequest
                  key={request._id}
                  request={request}
                  setRequest={setRequest}
                />
              }
            />
            <Route
              path="/requests/createRequest/2"
              element={
                <CreateRequestProblem
                  key={request._id}
                  request={request}
                  setRequest={setRequest}
                />
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route
              path="/profiles/:worker"
              element={<ProfileWorkerDetails />}
            />
            <Route
              path="/updateRequest/:requestId"
              element={
                <UpdateRequest
                  updateRequest={updateRequest}
                  setUpdateRequest={setUpdateRequest}
                  key={updateRequest._id}
                />
              }
            />
            <Route
              path="/updateRequest/2"
              element={
                <UpdateRequestProblem
                  updateRequest={updateRequest}
                  setUpdateRequest={setUpdateRequest}
                  key={request._id}
                />
              }
            />
            <Route
              path="/updateProfiles"
              element={
                <UpdateProfile profile={profile} setProfile={setProfile} />
              }
            />
            <Route
              path="/updateProfiles2"
              element={
                <UpdateProfileTwo profile={profile} setProfile={setProfile} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PullToRefresh>
      </Suspense>
    </>
  );
}

export default observer(App);
