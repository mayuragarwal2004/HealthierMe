import React from "react";
import { Paper, Button } from "@mui/material";
import "./Home.css";
import { useData } from "../components/context/data/DataState";
import { Link } from "react-router-dom";

import Divider from "@mui/material/Divider";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ClubSeasonInfo from "../components/user/ClubSeasonInfo";
import DateTabs from "../components/user/DateTabs";
import ChallengesLinear from "../components/user/ChallengesLinear";
import ModeIcon from "@mui/icons-material/Mode";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MainCarousel from "../components/user/MainCarousel";

const Home = () => {
  const {
    date,
    setdate,
    communityNo,
    seasonNo,
    activityNo,
    setactivityNo,
    challengeNo,
    data,
  } = useData();

  console.log({ sname: data.community[communityNo].season[seasonNo].sName });

  let counter = 0;

  return (
    <>
      <MainCarousel />
      <Divider style={{ borderColor: "#333333" }} />
      <ClubSeasonInfo />
      <Divider style={{ borderColor: "#333333" }} />
      <div className="challengedetails">
        <div className="challenge-details-row1">
          <div className="challenge-completed-details box">
            <div className="challenge-completed-details-trophy">
              <EmojiEventsIcon sx={{ color: "white" }} />
            </div>
            <div className="challenge-completed-details-main">
              <div className="challenge-completed-details-heading">
                Completed
              </div>
              <div className="challenge-completed-details-value">
                <span className="main-value">1/</span>
                <span className="total-value">12</span>
              </div>
            </div>
          </div>
          <div className="challenge-available-details box">
            Challenges Avaiable Now
          </div>
          <div className="view-all-challenges-button box">
            View All Challenges
          </div>
        </div>
        <div className="challenge-details-row2">
          <ChallengesLinear />
        </div>
        <div className="challenge-details-row3">
          <DateTabs dateValue={date} setdateValue={setdate} />
        </div>
      </div>
      <div className="specific-challenge-detail-parent">
        <div className="specific-challenge-detail">
          <div className="specific-challenge-detail-heading">
            <div className="left-heading">
              {data.community[communityNo].season[seasonNo].sName}
            </div>
            <div className="center-heading">
              {
                data.community[communityNo].season[seasonNo].challenge[
                  challengeNo
                ].cName
              }
            </div>
            <div className="right-heading">6th July 2023</div>
          </div>
          <div className="specific-challenge-detail-body-parent">
            {/* Showing the events not in a group */}
            {data.community[communityNo].season[seasonNo].challenge[
              challengeNo
            ].event
              .filter(notingroup)
              .map((eventitem) => {
                counter++;
                return (
                  <>
                    <hr style={{ width: "95%", borderColor: "#232323" }} />
                    <div className="specific-challenge-detail-body">
                      <div className="left-body">
                        <div className="activity-number">
                          Activity: {counter}
                        </div>
                        <div className="activity-detail">
                          <div className="activity-detail-heading">
                            {"\u00A0".repeat(2)} {eventitem.eName}
                          </div>
                        </div>
                      </div>
                      <div className="right-body">
                        <Link to="/edit">
                          <UploadFileIcon fontSize="large" />
                        </Link>
                        <Link to="/edit">
                          <ModeIcon fontSize="large" />
                        </Link>
                      </div>
                    </div>
                  </>
                );
              })}
            {/* Showing the tasks not in a group */}
            {data.community[communityNo].season[seasonNo].challenge[
              challengeNo
            ].task
              .filter(notingroup)
              .map((taskitem) => {
                counter++;
                return (
                  <>
                    <hr style={{ width: "95%", borderColor: "#232323" }} />
                    <div className="specific-challenge-detail-body">
                      <div className="left-body">
                        <div className="activity-number">
                          Activity: {counter}
                        </div>
                        <div className="activity-detail">
                          <div className="activity-detail-heading">
                            {"\u00A0".repeat(2)} {taskitem.tName}:{" "}
                            {taskitem.tQuant}
                          </div>
                        </div>
                      </div>
                      <div className="right-body">
                        <Link to="/edit">
                          <UploadFileIcon fontSize="large" />
                        </Link>
                        <Link to="/edit">
                          <ModeIcon fontSize="large" />
                        </Link>
                      </div>
                    </div>
                  </>
                );
              })}
            {data.community[communityNo].season[seasonNo].challenge[
              challengeNo
            ].group.map((groupitem) => {
              counter++;
              return (
                <>
                  <hr style={{ width: "95%", borderColor: "#232323" }} />
                  <div className="specific-challenge-detail-body">
                    <div className="left-body">
                      <div className="activity-number">Activity: {counter}</div>
                      <div className="activity-detail">
                        <div className="activity-detail-heading">
                          {"\u00A0".repeat(2)} {groupitem.gName}
                        </div>
                        {/* Showing the tasks in a group */}
                        {data.community[communityNo].season[seasonNo].challenge[
                          challengeNo
                        ].task
                          .filter((filtertask) => {
                            return filtertask.gId === groupitem.gId;
                          })
                          .map((taskitem) => (
                            <div className="activity-detail-body">
                              {"\u00A0".repeat(5)}
                              {taskitem.tName}: {taskitem.tQuant}
                            </div>
                          ))}
                        {/* Showing the events in a group */}
                        {data.community[communityNo].season[seasonNo].challenge[
                          challengeNo
                        ].event
                          .filter((filterevent) => {
                            return filterevent.gId === groupitem.gId;
                          })
                          .map((eventitem) => (
                            <div className="activity-detail-body">
                              {"\u00A0".repeat(5)}
                              {eventitem.tName}: {eventitem.tQuant}
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="right-body">
                      <Link to="/edit">
                        <UploadFileIcon fontSize="large" />
                      </Link>
                      <Link to="/edit">
                        <ModeIcon fontSize="large" />
                      </Link>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

function notingroup(i) {
  return i.gId === "";
}

export default Home;
