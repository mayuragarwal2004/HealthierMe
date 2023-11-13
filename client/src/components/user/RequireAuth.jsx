import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthState";
import React, { useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";

const RequireAuth = () => {
  let navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userExist, setuserExist] = useState(false);

  useEffect(() => {
    async function fetchData() {
      fetch("/api/user/userexist", {
        method: "POST", // Change the method according to your backend API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: currentUser.phoneNumber }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.exists) {
            setuserExist(true);
          } else {
            setuserExist(false);
            navigate("/signup", { replace: true });
          }

          console.log(data); // Assuming the response has a property 'exists' indicating if the user exists
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors here if needed
        });
    }
    if (currentUser) fetchData();
  }, [currentUser]);

  const location = useLocation();
  return currentUser === 0 ? (
    <CircularProgress />
  ) : Boolean(currentUser) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
