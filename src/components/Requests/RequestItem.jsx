import { Card } from "@mui/material";
import React, { useEffect } from "react";
import authstore from "../../store/authStore";
import profileStore from "../../store/profileStore";
import requestStore from "../../store/requestsStore";
import { Link } from "react-router-dom";

const RequestItem = ({ request }) => {
  if (profileStore.loading || authstore.loading || requestStore.loading)
    <h1>loading</h1>;

  const onDone = (e) => {
    e.preventDefault();
  };
  return (
    <Link to={`/request/${request.slug}`}>
      <Card className="card">
        <p>Customer Name: {request?.customerName}</p>
        <p>Customer Address: {request?.customerAddress}</p>
        <p>Phone Number: {request?.customerPhone}</p>
        <p>
          status:
          <span style={{ color: "green", fontWeight: "bold" }}>
            {request?.status}
          </span>
          {request?.status === "pending" && (
            <>
              <button onClick={onDone}>Done</button>
              <button>Cancel</button>
            </>
          )}
        </p>
      </Card>
    </Link>
  );
};

export default RequestItem;
