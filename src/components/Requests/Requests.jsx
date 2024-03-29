import React, { useState } from "react";
import authstore from "../../store/authStore";
import requestStore from "../../store/requestsStore";
import RequestItem from "./RequestItem";
import { observer } from "mobx-react";
import SearchBar from "../Additonal/SearchBar";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import NewDate from "../Additonal/NewDate";

const Requests = () => {
  const currentDate = new Date();
  const { t, i18n } = useTranslation();

  if (requestStore.loading || authstore.loading) <h1>loading</h1>;
  const [query, setQuery] = useState("");

  const [rangeDate, setRangeDate] = useState([
    new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000),
    new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000),
  ]);
  const navigate = useNavigate();
  if (authstore.user?.type !== "admin") {
    navigate("/");
  }
  console.log(requestStore?.requests);
  const workerRequestsPending = requestStore?.requests
    .filter(
      (req) =>
        (req.customerName != null &&
          req.customerName.toLowerCase().includes(query.toLowerCase())) ||
        (req.customerPhone != null &&
          req.customerPhone.toString().includes(query))
    )
    .filter((req) => {
      return moment(req.date).isBetween(rangeDate[0], rangeDate[1]);
    })
    .map((req) => (
      <div className="reqs">
        {req?.status === "pending" && (
          <RequestItem request={req} key={req._id} />
        )}
      </div>
    ))
    .sort((a, b) => a.date - b.date && a.time - b.time);

  const workerRequestsDone = requestStore?.requests
    .filter(
      (req) =>
        (req.customerName != null &&
          req.customerName.toLowerCase().includes(query.toLowerCase())) ||
        (req.customerPhone != null &&
          req.customerPhone.toString().includes(query))
    )
    .filter((req) => {
      return moment(req?.date).isBetween(rangeDate[0], rangeDate[1]);
    })
    .map((req) => (
      <div className="reqs">
        {req.status !== "pending" && (
          <RequestItem request={req} key={req._id} />
        )}
      </div>
    ))
    .sort((a, b) => a.date - b.date && a.time - b.time);

  const handleRangeDate = (date) => {
    setRangeDate(date);
    console.log(rangeDate);
  };
  return (
    <div>
      <div className="bk">
        {requestStore.loading || (authstore.loading && <h1>Loading</h1>)}
        <header className="App-header">
          <h1>{t("requests")}</h1>
        </header>
        <div className="search-text">
          <SearchBar setQuery={setQuery} />
        </div>
        {/* <NewDate /> */}
        <div className="container1">
          <DatePicker
            selected={rangeDate}
            value={rangeDate}
            selectRange={true}
            onChange={handleRangeDate}
            format="dd-MM-yyyy"
            className="date-picker"
          />
        </div>
        <div className="container">
          {requestStore.loading || (authstore.loading && <h1>Loading</h1>)}
          <div className="all-req">{workerRequestsPending}</div>
          <div className="all-req">{workerRequestsDone}</div>
        </div>
      </div>
    </div>
  );
};

export default observer(Requests);
