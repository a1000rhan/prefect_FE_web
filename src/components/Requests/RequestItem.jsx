import { Card } from "@mui/material";
import React, { useEffect } from "react";
import authstore from "../../store/authStore";
import profileStore from "../../store/profileStore";
import requestStore from "../../store/requestsStore";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

const RequestItem = ({ request }) => {
  if (profileStore.loading || authstore.loading || requestStore.loading)
    <h1>loading</h1>;

  const onDone = (e) => {
    e.preventDefault();
    request.status = "done";
    requestStore.updateRequest(request);
  };
  const onCancel = (e) => {
    e.preventDefault();
    request.status = "canceled";
    requestStore.updateRequest(request);
  };
  return (
    <Link to={`/request/${request.slug}`}>
      <Card className="card">
        <p>Customer Name: {request?.customerName}</p>
        <p>Customer Address: {request?.customerAddress}</p>
        <p>Phone Number: {request?.customerPhone}</p>
        <p>
          status:
          <span
            style={{
              color:
                request.status == "pending"
                  ? "blue"
                  : request.status == "done"
                  ? "green"
                  : "red",
              fontWeight: "bold",
            }}
          >
            &nbsp; {request?.status}
          </span>
          {request?.status === "pending" && (
            <>
              <button onClick={onDone}>Done</button>
              <button onClick={onCancel}>Cancel</button>
            </>
          )}
        </p>
      </Card>
    </Link>
  );
};

export default observer(RequestItem);
