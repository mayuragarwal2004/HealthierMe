import React from "react";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";

import "./ActivitiesLinear.css";
import TabPanel from "./TabPanel";
import { useData } from "../context/data/DataState";

const ActivitiesLinear = () => {
  const { activityNo, communityNo, seasonNo, setactivityNo, data, activityId, setactivityId } =
    useData();
  const handleChange = (event, newValue) => {
    setactivityNo(newValue);
  };
  let counter = 0;
  return (
    <div>
      <Tabs
        value={activityNo}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        className="linear-activites-tabs-parent"
        TabIndicatorProps={{
          style: { display: "none" },
        }}
      >
        {data.community[communityNo].season[seasonNo].challenge.map((item) => {
          return item?.event.filter(notingroup).map((eventitem) => {
            counter++;
            return (
              <Tab
                label={
                  <div className="linear-activites">
                    <div className="linear-activites-heading">
                      Activity: {counter}
                    </div>
                    <div className="linear-activites-body">
                      <div>{eventitem.eName}</div>
                    </div>
                    <div className="centered"></div>
                  </div>
                }
                sx={{ color: "black" }}
                id="activites-tabs"
                onClick={() => setactivityId(eventitem._id)}
              />
            );
          });
        })}
        {data.community[communityNo].season[seasonNo].challenge.map((item) => {
          return item?.task.filter(notingroup).map((taskitem) => {
            counter++;
            return (
              <Tab
                label={
                  <div className="linear-activites">
                    <div className="linear-activites-heading">
                      Activity: {counter}
                    </div>
                    <div className="linear-activites-body">
                      <div>
                        {taskitem.tName}: {taskitem.tQuant}
                      </div>
                    </div>
                    <div className="centered"></div>
                  </div>
                }
                sx={{ color: "black" }}
                id="activites-tabs"
                onClick={() => setactivityId(taskitem._id)}
              />
            );
          });
        })}
        {data.community[communityNo].season[seasonNo].challenge.map((item) => {
          return item?.event.filter(ingroup).map((eventitem) => {
            counter++;
            return (
              <Tab
                label={
                  <div className="linear-activites">
                    <div className="linear-activites-heading">
                      Activity: {counter}
                    </div>
                    <div className="linear-activites-body">
                      <div>{eventitem.eName}</div>
                    </div>
                    <div className="centered"></div>
                  </div>
                }
                sx={{ color: "black" }}
                id="activites-tabs"
                onClick={() => setactivityId(eventitem._id)}
              />
            );
          });
        })}
        {data.community[communityNo].season[seasonNo].challenge.map((item) => {
          return item?.task.filter(ingroup).map((taskitem) => {
            counter++;
            return (
              <Tab
                label={
                  <div className="linear-activites">
                    <div className="linear-activites-heading">
                      Activity: {counter}
                    </div>
                    <div className="linear-activites-body">
                      <div>
                        {taskitem.tName}: {taskitem.tQuant}
                      </div>
                      <div>
                         {item.group[0].minToComp}/{item.group[0].numOpts}
                      </div>
                    </div>
                    <div className="centered"></div>
                  </div>
                }
                sx={{ color: "black" }}
                id="activites-tabs"
                onClick={() => setactivityId(taskitem._id)}
              />
            );
          });
        })}
        {/* <Tab
          label={
            <div className="linear-activites">
              <div className="linear-activites-heading">Activity 1</div>
              <div className="linear-activites-body">
                <div>2 Treks</div>
                <div>1 family Trek</div>
              </div>
              <div className="centered"></div>
            </div>
          }
          sx={{ color: "black" }}
          id="activites-tabs"
        />
        <Tab
          label={
            <div className="linear-activites">
              <div className="linear-activites-heading">Activity 1</div>
              <div className="linear-activites-body">
                <Box
                  component="div"
                  className="linear-activites-data"
                  sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                >
                  2 Treks 1 family Trek
                </Box>
              </div>
            </div>
          }
          sx={{ color: "black" }}
          id="activites-tabs"
        /> */}
      </Tabs>
    </div>
  );
};

function notingroup(i) {
  return i.gId === "";
}

function ingroup(i) {
  return i.gId !== "";
}

export default ActivitiesLinear;
