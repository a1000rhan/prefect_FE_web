import React, { useState } from "react";

import { addDays } from "date-fns";

import { DateRangePicker } from "react-date-range";

const [state, setState] = useState([
  {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
]);
const NewDate = () => {
  return (
    <DateRangePicker
      onChange={(item) => setState([item.selection])}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={state}
      direction="horizontal"
    />
  );
};

export default NewDate;
