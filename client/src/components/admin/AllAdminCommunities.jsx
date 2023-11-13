import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import MainCard from "./MainCard";

const AllAdminCommunities = () => {
  const navigate = useNavigate();
  const communities = [
    { id: "C1234", name: "Rotary", desc: "About Rotary", imageURL: "" },
  ];
  return (
    <div>
      <div className="w3-row-padding device-row">
        <div className="w3-col l3 m6 w3-margin-bottom card-parent">
          {communities.map((element) => (
            <MainCard
              img={element.imageURL ? element.imageURL : "community.png"}
              deviceName={element.deviceName}
              note={element.deviceNote}
              onClick={() => {
                console.log("hello");
                navigate("/device/edit".concat(element.deviceName));
              }}
            />
          ))}
        </div>
        <Button variant="contained">Button</Button>
        {/* <!-- End page content --> */}
      </div>
    </div>
  );
};

export default AllAdminCommunities;
