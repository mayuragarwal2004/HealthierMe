import React, { useState } from "react";
import MainCarousel from "../components/user/MainCarousel";
import DateTabs from "../components/user/DateTabs";
import { useData } from "../components/context/data/DataState";

import Divider from "@mui/material/Divider";
import ActivitiesLinear from "../components/user/ActivitiesLinear";

const EditChallenge = () => {
  const { date, setdate, communityNo, seasonNo, setactivityNo, data, challengeNo } =
    useData();

  return (
    <div>
      <MainCarousel />
      <Divider style={{ borderColor: "#333333" }} />
      <div className="specific-challenge-detail">
        <div className="specific-challenge-detail-heading">
          <div className="left-heading">{data.community[communityNo].season[seasonNo].sName}</div>
          <div className="center-heading">{data.community[communityNo].season[seasonNo].challenge[challengeNo].cName}</div>
          <div className="right-heading">6th July 2023</div>
        </div>
        <hr style={{ width: "95%", borderColor: "#232323" }} />
        <DateTabs />
        <ActivitiesLinear />
        <div className="edit-challenge-activites">
          <div className="edit-challenge-activites-row">
            <div className="edit-challenge-activites-items">
              Activity Completed.*
            </div>
            <div className="edit-challenge-activites-items">
              <input type="checkbox" name="" id="" />
            </div>
          </div>

          <hr style={{ width: "95%", borderColor: "#232323", margin: 0 }} />

          <div className="edit-challenge-activites-row">
            <div className="edit-challenge-activites-items">
              Details of Exercise
            </div>
            <div className="edit-challenge-activites-items">
              <input type="number" name="" id="" />
            </div>
          </div>

          <hr style={{ width: "95%", borderColor: "#232323", margin: 0 }} />

          {/* <div className="edit-challenge-activites-row">
            <div className="edit-challenge-activites-items">Upload pic</div>
            <div className="edit-challenge-activites-items">
              <input type="image" src="" alt="" />
            </div>
          </div>

          <hr style={{ width: "95%", borderColor: "#232323", margin: 0 }} /> */}

          <div className="edit-challenge-activites-row button-row">
            <button className="edit-activites-button">Cancel</button>
            <button className="edit-activites-button">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditChallenge;
