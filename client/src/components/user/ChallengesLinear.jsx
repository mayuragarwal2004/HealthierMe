import React from "react";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import "./ChallengesLinear.css";
import { useData } from "../context/data/DataState";

const ChallengesLinear = () => {
  // const [value, setValue] = React.useState(1);
  const { data, communityNo, seasonNo, challengeNo, setchallengeNo } = useData();

  const handleChange = (event, newchallengeNo) => {
    setchallengeNo(newchallengeNo);
  };
  return (
    <div>
      <Tabs
        value={challengeNo}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {data.community[communityNo].season[seasonNo].challenge.map((item) => (
          <Tab
            label={
              <div className="linear-challenge">
                <div className="linear-challenge-heading">{item.cName}</div>
                <div className="linear-challenge-body">
                  <div className="linear-challenge-body-heading">Treks</div>
                  <div className="linear-challenge-data">
                    {item?.event.filter(notingroup).map((eventitem) => (
                      <div>{eventitem.eName}</div>
                    ))}
                    {item?.task.filter(notingroup).map((taskitem) => (
                      <div>{taskitem.tName}</div>
                    ))}
                    {item?.group.map((taskitem) => (
                      <div>{taskitem.gName}</div>
                    ))}
                  </div>
                </div>
                <hr style={{ margin: 0 }} />
                <div className="linear-challenge-timeline">
                  {month[new Date(item.cStart).getMonth()]} To{" "}
                  {month[new Date(item.cEnd).getMonth()]}
                </div>
                {/* <img
                src={CalendarIcon}
                alt=""
                style={{
                  width: "43px",
                  backgroundColor:
                    item > date ? tabBkgColor.disabled : tabBkgColor.completed,
                }}
              /> */}
                <div className="centered"></div>
              </div>
            }
            sx={{ color: "black" }}
            id="linear-challenge-tabs"
          />
        ))}
        {/* <Tab
          label={
            <div className="linear-challenge">
              <div className="linear-challenge-heading">Challenge 1</div>
              <div className="linear-challenge-body">
                <div className="linear-challenge-body-heading">Treks</div>
                <div className="linear-challenge-data">
                  <div>2 Treks</div>
                  <div>1 family Trek</div>
                </div>
              </div>
              <hr style={{ margin: 0 }} />
              <div className="linear-challenge-timeline">July To April</div>
            </div>
          }
          sx={{ color: "black" }}
          id="date-tabs"
        /> */}
      </Tabs>
    </div>
  );
};

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function ingroup(i) {
  return i.gId !== "";
}

function notingroup(i) {
  return i.gId === "";
}

export default ChallengesLinear;
