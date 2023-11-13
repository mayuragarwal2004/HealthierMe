// import React from "react";
import React, { useContext, createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DataContext from "./DataContext";
import { useAuth } from "../auth/AuthState";
import {
  getCommunities,
  updateCommunityIds,
  getSeasons,
  updateSeasonIds,
  getChallenges,
  updateChallengeIds,
  getTEG,
  updateTEGList,
} from "../../backendRequests/functionUtils";

const DataState = (props) => {
  const [date, setdate] = useState(new Date().getDate() - 1);
  const [editFlag, seteditFlag] = useState(false);
  const [activityNo, setactivityNo] = useState(null);
  const [activityId, setactivityId] = useState("");
  const [communityNo, setcommunityNo] = useState(0);
  const [seasonNo, setseasonNo] = useState(0);
  const [challengeNo, setchallengeNo] = useState(0);
  const { currentUser } = useAuth();
  const invalidDataURL = ["/signup"];
  const [data, setdata] = useState({
    community: [
      {
        _id: "649f30a344125007897fac42",
        cId: "s16875186312939",
        cName: "Season1",
        role: "Creator",
        season: [
          {
            _id: "649f30a344125007897fac43",
            sId: "s16875186312939",
            sName: "Season1",
            sStart: "2023-06-19T20:24",
            sEnd: "2023-06-19T21:24",
            challengeNo: 1,
            challengeIds: ["c16871863142939"],
            __v: 0,
            challenge: [
              {
                _id: "649f30a344125007897fac45",
                cId: "c16871863142939",
                cName: "Challenge 1",
                cDesc: "1st challenge",
                cStart: "2023-06-19T20:24",
                cEnd: "2023-06-20T20:24",
                __v: 0,
                group: [
                  {
                    gName: "Group Name",
                    gId: "g1687186319821",
                    numOpts: 1,
                    minToComp: 1,
                    taskIds: ["t1687186312945"],
                    eventIds: [],
                    _id: "649f30a444125007897fac4e",
                  },
                ],
                event: [
                  {
                    eId: "e16871863124078",
                    eName: "Zumba",
                    eDesc: "Zumba",
                    eStart: "2023-06-19T20:24",
                    eEnd: "2023-06-20T20:24",
                    eFreq: 1,
                    gId: "",
                    _id: "649f30a444125007897fac4b",
                  },
                ],
                task: [
                  {
                    tId: "t1687186312945",
                    tName: "walking",
                    tDesc: "walk 3000 unit steps daily for 21 days",
                    tQuant: 3000,
                    tUnit: "units",
                    tPeriodUnit: "daily",
                    tTC: 21,
                    tStart: "2023-06-19T20:24",
                    tEnd: "2023-06-20T20:24",
                    gId: "g1687186319821",
                    _id: "649f30a344125007897fac48",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  console.log({ data });

  // useEffect(() => {
  //   async function fetchData() {
  //     const xyz = await getTEG(
  //       "6Z9Jp5dgq9YkzhkPOhGCf63yjQx2",
  //       "o1234567890",
  //       "s123456789034",
  //       "c8968798656900"
  //     );
  //     console.log({
  //       xyz,
  //     });
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        if (
          currentUser?.uid &&
          !invalidDataURL.includes(window.location.pathname)
        ) {
          console.log("await updateCommunity()");
          console.log(window.location.pathname);
          let newdata = await updateTEG(
            await updateChallenge(
              await updateSeason(await updateCommunity(data))
            )
          );

          setdata(newdata);
        }
      } catch (error) {
        console.error(error);
        if (fetchData.retryCount < 3) {
          const retryDelay = (fetchData.retryCount + 1) * 5000; // Increase delay with number of tries
          console.log(
            `Retrying in ${retryDelay / 1000} seconds... (retry ${
              fetchData.retryCount + 1
            })`
          );
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          fetchData.retryCount++;
          fetchData();
        } else {
          console.error(`Maximum retries reached (${fetchData.retryCount}).`);
        }
      }
    }
    fetchData.retryCount = 0;
    fetchData();
  }, [currentUser, communityNo, seasonNo, challengeNo]);

  console.log("hello");
  console.log(data.community[communityNo].cId);

  const updateCommunity = async (ldata = data) => {
    if (communityNo === -1) return ldata;
    try {
      const communityIds = await getCommunities(currentUser.uid);
      console.log({ communitylist: communityIds });
      const updatedData = updateCommunityIds(ldata, communityIds);
      return updatedData;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be handled elsewhere if needed.
    }
  };

  const updateSeason = async (updatedData = data) => {
    if (seasonNo === -1) return updatedData;
    try {
      const seasonIds = await getSeasons(
        currentUser.uid,
        updatedData.community[communityNo].cId
      );
      console.log({ seasonlist: seasonIds });
      const updatedNewData = updateSeasonIds(
        updatedData,
        updatedData.community[communityNo].cId,
        seasonIds
      );

      console.log({ updatedNewData });
      return updatedNewData;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be handled elsewhere if needed.
    }
  };

  const updateChallenge = async (updatedData = data) => {
    if (challengeNo === -1) return updatedData;
    try {
      const challengeIds = await getChallenges(
        currentUser.uid,
        updatedData.community[communityNo].cId,
        updatedData.community[communityNo].season[seasonNo].sId
      );
      // console.log({ seasonlist: seasonIds });
      const updatedNewData = updateChallengeIds(
        updatedData,
        updatedData.community[communityNo].cId,
        updatedData.community[communityNo].season[seasonNo].sId,
        challengeIds
      );

      console.log({ updatedNewData });
      return updatedNewData;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be handled elsewhere if needed.
    }
  };

  const updateTEG = async (updatedData = data) => {
    if (challengeNo === -1) return updatedData;
    try {
      const TEGdata = await getTEG(
        currentUser.uid,
        updatedData.community[communityNo].cId,
        updatedData.community[communityNo].season[seasonNo].sId,
        updatedData.community[communityNo].season[seasonNo].challenge[
          challengeNo
        ].cId
      );

      console.log({ TEGdata });
      // console.log({ seasonlist: seasonIds });
      const updatedNewData = updateTEGList(
        updatedData,
        updatedData.community[communityNo].cId,
        updatedData.community[communityNo].season[seasonNo].sId,
        updatedData.community[communityNo].season[seasonNo].challenge[
          challengeNo
        ].cId,
        TEGdata
      );

      console.log({ tegdataupdate: updatedNewData });
      return updatedNewData;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be handled elsewhere if needed.
    }
  };

  const value = {
    data,
    setdata,
    date,
    setdate,
    communityNo,
    setcommunityNo,
    seasonNo,
    setseasonNo,
    activityNo,
    setactivityNo,
    activityId,
    setactivityId,
    challengeNo,
    setchallengeNo,
    editFlag,
    seteditFlag,
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export function useData() {
  return useContext(DataContext);
}

export default DataState;
