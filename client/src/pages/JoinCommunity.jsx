import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./JoinCommunity.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { useAuth } from "../components/context/auth/AuthState";

import { JoinCommunityServer } from "../components/backendRequests/functionUtils";

const JoinCommunity = () => {
  const { id } = useParams();
  const [alertData, setalertData] = useState({
    severity: "",
    title: "",
    msg: "",
  });
  const [communityCode, setcommunityCode] = useState("");
  const [invitedCommunityData, setinvitedCommunityData] = useState({
    name: "",
    creatorName: "",
  });

  const { currentUser } = useAuth();

  useEffect(() => {
    if (id) {
      setcommunityCode(id);
    }
    // console.log({ id });
  }, []);

  const handleJoinCommunity = async () => {
    if (currentUser) {
      const joinresult = await JoinCommunityServer(
        communityCode,
        currentUser.uid,
        "Member"
      );
      console.log({ joinresult: joinresult.body });
    }
    console.log("join community");
  };

  return (
    <div className="join-community-parent">
      <div className="join-community-heading">Join A Community</div>
      <div className="join-community-input">
        <TextField
          label="Enter community code"
          variant="outlined"
          value={communityCode}
          onChange={(e) => setcommunityCode(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleJoinCommunity}
          style={{ margin: "10px 0" }}
          endIcon={<GroupAddIcon />}
        >
          Join
        </Button>
        <Alert variant="filled" severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>
      </div>
    </div>
  );
};

export default JoinCommunity;
