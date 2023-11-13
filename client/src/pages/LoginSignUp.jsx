import React, { useState } from "react";
// import { auth, app } from "../base";
// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   updateProfile,
//   signOut,
// } from "firebase/auth";
// import { useAuth } from "../components/context/auth/AuthState";
// import { useLocation, Navigate, useNavigate } from "react-router-dom";
// import Alert from "@mui/material/Alert";
// import PhoneNumber from "../components/auth/PhoneNumber";
import "./auth.css";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabPanel from "../components/user/TabPanel";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";

const LoginSignUp = () => {

  const [tab, settab] = useState(0);
  const handleChange = (event, newValue) => {
    settab(newValue);
  };

  // console.log(currentUser);

  return (
    <div className="home-agenda section-container">
      <div className="home-max-width2 max-content-container">
        <div className="home-heading-container1">
          <h1 className="home-text11 heading2">Sign Up/Log In</h1>
        </div>
        <div style={{ width: "100%" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            <Tab label="Login" sx={{ color: "black" }} />
            <Tab label="SignUp" sx={{ color: "black" }} />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <Login />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <SignUp />
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
