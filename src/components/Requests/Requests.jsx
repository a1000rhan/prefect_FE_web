import React, { useState } from "react";
import authstore from "../../store/authStore";
import requestStore from "../../store/requestsStore";
import RequestItem from "./RequestItem";
import { observer } from "mobx-react";

const Requests = () => {
  if (requestStore.loading || authstore.loading) <h1>loading</h1>;

  const workerRequests = requestStore?.requests.map((req) => (
    <div className="reqs">
      <RequestItem request={req} key={req._id} />
    </div>
  ));
  console.log(
    "🚀 ~ file: Requests.jsx ~ line 14 ~ Requests ~ workerRequests",
    workerRequests
  );

  return (
    <div className="App-header">
      <h1>Requests</h1>
      <div>
        <div className="all-req">{workerRequests}</div>
      </div>
    </div>
  );
};

export default observer(Requests);
