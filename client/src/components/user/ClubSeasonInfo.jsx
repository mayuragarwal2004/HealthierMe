import React from "react";
import Box from "@mui/material/Box";

import { useData } from "../context/data/DataState";

const ClubSeasonInfo = () => {
  const { data, communityNo, seasonNo } = useData();
  return (
    <div className="club-season-info">
      <div className="club-parent">
        <Box
          component="div"
          className="club-name-main"
          sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          Rotary
        </Box>
        <Box
          component="div"
          className="club-branch-main"
          sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          Rotary Club of Lokmanynagar
        </Box>
      </div>
      <div className="season-parent">
        <Box
          component="div"
          className="season-heading-main"
          sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          Season:
        </Box>
        <Box
          component="div"
          className="season-main"
          sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {data.community[communityNo].season[seasonNo].sName}
        </Box>
      </div>
    </div>
  );
};

export default ClubSeasonInfo;
