import React, { useState } from "react";
import authstore from "../../store/authStore";
import requestStore from "../../store/requestsStore";
import RequestItem from "./RequestItem";
import { observer } from "mobx-react";
import SearchBar from "../Additonal/SearchBar";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import moment from "moment";
const Requests = () => {
  const currentDate = new Date();
  if (requestStore.loading || authstore.loading) <h1>loading</h1>;
  const [query, setQuery] = useState("");
  const [rangeDate, setRangeDate] = useState([
    new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000),
    new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000),
  ]);
  const workerRequests = requestStore?.requests
    .filter(
      (req) =>
        req.customerPhone
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        req.customerName.toLowerCase().includes(query.toLowerCase()) ||
        (req.date >= moment(rangeDate[0]).format("YYYY-MM-DD") &&
          req.date <= moment(rangeDate[1]).format("YYYY-MM-DD"))
    )
    .map((req) => (
      <div className="reqs">
        <RequestItem request={req} key={req._id} />
      </div>
    ));

  const handleRangeDate = (date) => {
    setRangeDate(date);
    console.log(rangeDate);
  };
  return (
    <div>
      <div className="bk">
        {requestStore.loading || (authstore.loading && <h1>Loading</h1>)}
        <header className="App-header">
          <h1>Requests</h1>
        </header>
        <div className="search-text">
          <SearchBar setQuery={setQuery} />
        </div>
        <DatePicker
          selected={rangeDate}
          value={rangeDate}
          selectRange={true}
          onChange={handleRangeDate}
          format="dd-MM-yyyy"
        />
        <div className="container">
          <div className="all-req">{workerRequests}</div>
        </div>
      </div>
    </div>
  );
};

export default observer(Requests);
