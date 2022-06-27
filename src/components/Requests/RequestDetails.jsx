import React from "react";
import { Link, useParams } from "react-router-dom";
import requestStore from "../../store/requestsStore";

const RequestDetails = () => {
  const { slug } = useParams();
  const requestD = requestStore.requests.find(
    (request) => request.owner === slug
  );
  return <div>{requestD}</div>;
};

export default RequestDetails;
