import React from "react";
import CalendarIcon from "./images/calendar-color-icon.svg";
import "./DateTabs.css";
import { useData } from "../context/data/DataState";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const DateTabs = () => {
  const { date, setdate } = useData();
  let dateobj = new Date();
  let dateValue = dateobj.getDate();
  let month = dateobj.getMonth() + 1;
  let year = dateobj.getFullYear();
  const handleChange = (event, newValue) => {
    setdate(newValue);
  };

  return (
    <div>
      <Tabs
        value={date}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {arrayRange(1, daysInMonth(month, year), 1).map((item, index) => (
          <Tab
            key={index}
            label={
              <div className="container">
                <img
                  src={CalendarIcon}
                  alt=""
                  style={{
                    width: "43px",
                    backgroundColor:
                      item > dateValue
                        ? tabBkgColor.disabled
                        : tabBkgColor.completed,
                  }}
                />
                <div className="centered">{item}</div>
              </div>
            }
            sx={{ color: "black" }}
            id="date-tabs"
            disabled={item > dateValue}
          />
        ))}
      </Tabs>
      {/* {children}
      <TabPanel value={value} index={0}>
        {daysInMonth(6, 2023)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        abc2
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </div>
  );
};

const tabBkgColor = {
  disabled: "#b9b9b9",
  completed: "#87ff87",
  incomplete: "#ffa3a3",
  normal: "white",
};

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export default DateTabs;
