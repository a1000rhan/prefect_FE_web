import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import requestStore from "../../store/requestsStore";
import * as Icon from "react-bootstrap-icons";

const RequestDetails = () => {
  const { slug } = useParams();
  const requestD = requestStore.requests.find(
    (request) => request.slug === slug
  );
  const navigate = useNavigate();

  return (
    <div>
      <header className="App-header">
        <Icon.ArrowLeft
          onClick={() => navigate(-1)}
          size={30}
          className="top-icon"
        />
        <h1>Request Details</h1>
      </header>
      <div className="">
        <h1>{requestD?.customerName}</h1>
        <p>{requestD?.customerAddress[0].house}</p>
        <p>{requestD?.customerAddress[0].street}</p>
        <p>{requestD?.customerAddress[0].block}</p>
        <p>{requestD?.customerPhone}</p>
        <p>{requestD?.date}</p>
      </div>
    </div>
  );
};

export default RequestDetails;
