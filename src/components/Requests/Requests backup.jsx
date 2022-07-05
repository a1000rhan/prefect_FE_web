import React, { useState } from "react";
import authstore from "../../store/authStore";
import requestStore from "../../store/requestsStore";
import RequestItem from "./RequestItem";
import { observer } from "mobx-react";
import SearchBar from "../Additonal/SearchBar";

const Requests = () => {
  if (requestStore.loading || authstore.loading) <h1>loading</h1>;
  const [query, setQuery] = useState("");

  const workerRequests = requestStore?.requests
    .filter((req) =>
      req.customerName.toLowerCase().includes(query.toLowerCase())
    )

    .map((req) => (
      <div className="reqs">
        <RequestItem request={req} key={req._id} />
      </div>
    ));

  return (
    <div>
      <div className="bk">
        <header className="App-header">
          <h1>Requests</h1>
        </header>
        <div className="search-text">
          <SearchBar setQuery={setQuery} />
        </div>

        <div className="container">
          <div className="all-req">{workerRequests}</div>
        </div>
      </div>
    </div>
  );
};

export default observer(Requests);
