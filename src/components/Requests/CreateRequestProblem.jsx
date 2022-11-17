import React, { useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import profileStore from "../../store/profileStore";
import requestStore from "../../store/requestsStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import * as Icon from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import authstore from "../../store/authStore";

const CreateRequestProblem = ({ request, setRequest }) => {
  const { t, i18n } = useTranslation();

  profileStore.loading && <h1>loading</h1>;
  const [problemDesc, setProblemDesc] = useState({
    operation: "",
    unit: "",
  });

  const [theWorker, setWorker] = useState("");
  const navigate = useNavigate();
  if (authstore.user?.type !== "admin") {
    navigate("/");
  }

  const workersName = profileStore.workers.map((worker) => (
    <option value={worker._id}>{worker.firstName}</option>
  ));

  const handleChange = (event) => {
    setRequest({ ...request, [event.target.name]: event.target.value });
  };
  const handleChangeOperation = (event) => {
    setProblemDesc({ ...problemDesc, operation: event.target.value });
  };
  const handleChangeUnit = (event) => {
    setProblemDesc({ ...problemDesc, unit: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const allData = { ...request, problemDesc: problemDesc };
    theWorker == []
      ? alert("select a worker")
      : requestStore.createNewRequests(allData, theWorker, navigate, Swal);
    setRequest({
      customerName: "",
      customerAddress: {},
      customerPhone: "",
      time: "",
      date: "",
      notes: "",
      problemDesc: {},
    });
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
              <label className="labelT">{t("problem")}</label>
              <br />
              <RadioGroup
                name="unit"
                className="checkbox2"
                onChange={handleChangeUnit}
              >
                <FormControlLabel
                  value="split"
                  name="unit"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label={t("split")}
                />

                <FormControlLabel
                  value="central"
                  name="problem2"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label={t("central")}
                />
              </RadioGroup>
              <RadioGroup
                name="operation"
                className="checkbox3"
                onChange={handleChangeOperation}
              >
                <FormControlLabel
                  value="Maintenance"
                  name="operation"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label={t("maintenance")}
                />

                <FormControlLabel
                  value="Installing"
                  name="problemDesc"
                  sx={{ color: "white" }}
                  control={<Radio sx={{ color: "white" }} />}
                  label={t("installing")}
                />
              </RadioGroup>

              <br />
              <label className="labelT">{t("problemDescription")}</label>
              <textarea
                className="textF"
                name="notes"
                value={request.notes}
                onChange={handleChange}
              />
              <br />
              <label className="labelT">Worker</label>
              <select onChange={(e) => setWorker(e.target.value)}>
                <option required>select</option>
                {workersName}
              </select>
            </div>
          </form>
          <button className="btns" onClick={handleSubmit}>
            {t("createRequest")}
          </button>
        </div>
      </div>
    </>
  );
};

export default observer(CreateRequestProblem);
