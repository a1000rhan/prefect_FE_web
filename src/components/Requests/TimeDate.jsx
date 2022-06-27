import React, { useState } from "react";
import DatePicker from "sassy-datepicker";
import { TimePicker } from "sassy-datepicker";
import { Button, Modal, Box } from "@mui/material";
import moment from "moment";

const TimeDate = ({ setDate, date, setTime, time }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const dateChange = (d) => {
    setDate(moment(d).format("YYYY-MM-DD"));
    setOpen(false);
  };
  const timeChange = (t) => {
    setTime(moment(t).format("HH:mm"));
  };

  return (
    <>
      <Button onClick={handleOpen}>Select the Date</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={style}
      >
        <Box>
          <TimePicker onChange={timeChange} selected={time} />

          <DatePicker onChange={dateChange} selected={date} />
          <Button onClick={handleClose}>close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default TimeDate;
