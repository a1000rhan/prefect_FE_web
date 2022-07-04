import React, { useState } from "react";
// import DatePicker from "sassy-datepicker";
// import { TimePicker } from "sassy-datepicker";
import { Button, Modal, Box } from "@mui/material";
// import { DatePicker } from "@julienvanbeveren/react-datetime-picker";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import TimePicker from "react-time-picker/dist/entry.nostyle";

const TimeDate = ({ setDate, date, setTime, time }) => {
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <DatePicker
        className="date-picker"
        minDate={new Date()}
        format="yyyy-MM-dd"
        value={date}
        defaultView={new Date()}
        onChange={setDate}
      />
      <TimePicker
        minTime={new Date()}
        className="date-picker"
        value={time}
        onChange={setTime}
        disableClock={true}
      />
    </div>
  );
};

export default TimeDate;
