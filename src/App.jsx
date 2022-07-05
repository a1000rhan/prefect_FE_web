import "./App.css";
import "./components/Profiles/profile.css";
import "./components/Requests/requests.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-date-picker/dist/DatePicker.css";
import "react-time-picker/dist/TimePicker.css";

import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import PDFReceipt from "./components/Requests/PDFReceipt";

function App() {
  const [showNav, setShowNav] = useState("none");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    position: "",
    civilId: "",
    age: "",
    address: "",
    image: "",
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
  console.log(
    "🚀 ~ file: App.jsx ~ line 31 ~ App ~ currentLocation",
    location.pathname
  );

  return (
    <>
      <Navbar location={location} key={profile._id} />

      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/profiles/:worker" element={<ProfileWorkerDetails />} />
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
          element={<UpdateProfile profile={profile} setProfile={setProfile} />}
        />
        <Route
          path="/updateProfiles2"
          element={
            <UpdateProfileTwo profile={profile} setProfile={setProfile} />
          }
        />
        <Route path="/receipt" element={<PDFReceipt />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
