import React, { useState } from "react";
import TimeDate from "../Additonal/TimeDate";
import { useNavigate } from "react-router-dom";
import profileStore from "../../store/profileStore";
import * as Icon from "react-bootstrap-icons";
import moment from "moment";
import { useTranslation } from "react-i18next";
import authstore from "../../store/authStore";

const CreateRequest = ({ request, setRequest }) => {
  const [time, setTime] = useState("10:00");
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState({
    house: "",
    street: "",
    city: "",
    block: "",
    apartment: "",
    floor: "",
  });
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  if (authstore.user?.type !== "admin") {
    navigate("/");
  }
  const handleChange = (event) => {
    setRequest({ ...request, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    console.log(address);
    setRequest({
      ...request,
      customerAddress: address,
      time: time,
      date: moment(date).format("YYYY-MM-DD"),
    });
    profileStore.fetchWorkersProfiles();
    navigate("/requests/createRequest/2");
  };

  return (
    <>
      <div className="bk">
        <header className="App-header">
          {i18n.language === "ar" ? (
            <Icon.ArrowRight
              onClick={() => navigate(-1)}
              size={30}
              className="top-icon"
            />
          ) : (
            <Icon.ArrowLeft
              onClick={() => navigate(-1)}
              size={30}
              className="top-icon"
            />
          )}

          <h1>{t("createRequest")}</h1>
        </header>
        <div className="container">
          <form className="requst-form" onSubmit={handleSubmit}>
            <div className="felids">
              <label className="labelT">{t("customerName")}</label>
              <input
                className="textF"
                value={request.customerName}
                type="text"
                name="customerName"
                onChange={handleChange}
              />
              <label className="labelT">{t("customerAddress")}</label>
              <div className="addressB">
                <p className="addressL">{t("house")}:</p>
                <input
                  className="addressF"
                  value={address.house}
                  type="text"
                  name="house"
                  onChange={(e) =>
                    setAddress({ ...address, house: e.target.value })
                  }
                />
                <p className="addressL">{t("street")}:</p>
                <input
                  value={address.street}
                  type="text"
                  name="street"
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className="addressF"
                />
                <p className="addressL">{t("block")}:</p>
                <input
                  value={address.block}
                  type="text"
                  name="block"
                  onChange={(e) =>
                    setAddress({ ...address, block: e.target.value })
                  }
                  className="addressF"
                />
                <p className="addressL">{t("city")}:</p>
                <input
                  value={address.city}
                  type="text"
                  name="city"
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  style={{ width: "100px", margin: "5px" }}
                />
                <div></div>
                <p className="addressL">{t("apt")}:</p>
                <input
                  value={address.apartment}
                  type="text"
                  name="apartment"
                  onChange={(e) =>
                    setAddress({ ...address, apartment: e.target.value })
                  }
                  className="addressF"
                />
                <p className="addressL">{t("floor")}:</p>
                <input
                  className="addressF"
                  value={address.floor}
                  type="text"
                  name="floor"
                  onChange={(e) =>
                    setAddress({ ...address, floor: e.target.value })
                  }
                />
              </div>
              <label className="labelT">{t("customerPhone")}</label>
              <input
                className="textF"
                value={request.customerPhone}
                type="text"
                name="customerPhone"
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label className="labelT">{t("date")}</label>
              <TimeDate
                setTime={setTime}
                time={time}
                setDate={setDate}
                date={date}
              />
            </div>
            <br />
          </form>
          <div className="center">
            <button className="btns" onClick={handleSubmit}>
              {t("createRequest")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRequest;
