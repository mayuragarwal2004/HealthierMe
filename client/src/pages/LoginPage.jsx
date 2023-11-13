import React, { useState, useEffect } from "react";
import "./login.css";
import PhoneNumber from "../components/auth/PhoneNumber";

import { auth, app } from "../base";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useAuth } from "../components/context/auth/AuthState";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const [phnostatus, setphnostatus] = useState({ msg: "", type: "success" });
  const [fullname, setfullname] = useState("");
  const [phno, setphno] = useState({ phone: "91", valid: false });
  const [loginstate, setloginstate] = useState(false);
  useEffect(() => {
    if (currentUser) {
      setloginstate(true);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      if (!phno.phone) {
        setphno({ phone: currentUser.phoneNumber, valid: false });
      }
      if (!fullname) {
        setfullname(currentUser.displayName);
      }
      // ...
    } else {
      // User is signed out
      // ...
      console.log("signed out detected");
      setloginstate(false);
    }
  }, [currentUser]);

  const handleChangePhno = (value) => {
    setphno(value);
    setotpreq(false);
    setphnostatus({ msg: "", type: "success" });
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    updateProfile(currentUser, {
      displayName: fullname,
    })
      .then(() => {
        // Profile updated!
        // ...
        navigate("/dashboard", { replace: true });
        console.log("profile updates");
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });
  };

  function handlesignout() {
    console.log("nothing");
    if (currentUser) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    }
  }

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };
  // console.log(phno.phone.slice(0, 3));
  const [otp, setotp] = useState("");
  const [otpreq, setotpreq] = useState(false);

  const checkUser = (e) => {
    e.preventDefault();
    if (phno.valid)
      setphnostatus({
        msg: "Finding if the number is registered",
        type: "info",
      });
    else {
      setphnostatus({ msg: "Phone Number in wrong format", type: "error" });
      return;
    }

    fetch("/api/user/userexist", {
      method: "POST", // Change the method according to your backend API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phno.phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.exists) requestOTP();
        else
          setphnostatus({
            msg: (
              <>
                Phone Number couldn't be found. Please{" "}
                <Link to="/signup">
                  <b>Sign Up</b>
                </Link>{" "}
                or try again with another number
              </>
            ),
            type: "error",
          });

        console.log(data); // Assuming the response has a property 'exists' indicating if the user exists
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here if needed
      });
  };

  function requestOTP() {
    // e.preventDefault();
    setphnostatus({ msg: "Verifying phone number", type: "info" });
    if (phno.valid) {
      setphnostatus({ msg: "OTP  is being sent...", type: "info" });
      try {
        if (!window.recaptchaVerifier) {
          generateRecaptcha();
        }
      } catch (err) {
        console.log("Error caught");
        setphnostatus({
          msg: "Error occured: " + err.code,
          type: "error",
        });
      }
      if (window.recaptchaVerifier) {
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phno.phone, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setphnostatus({
              msg: "OTP is sent. Please Check you messages.",
              type: "info",
            });
            setotpreq(true);
          })
          .catch((error) => {
            setphnostatus({
              msg: error,
              type: "error",
            });
            console.log(error);
          });
      }
    } else {
      setphnostatus({ msg: "Phone Number in wrong format", type: "error" });
    }
  }

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setotp(otp);

    if (otp.length === 6 && phno.valid) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const currentUser = result.user;
          console.log(currentUser);
          // query backend to send currentUser.uid and any other information needed
          setotpreq(false);
          setphnostatus({ msg: "OTP verified successfully!", type: "success" });
          setTimeout(() => {
            setphnostatus({ msg: "", type: "success" });
          }, 10000);
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          setphnostatus({
            msg: "Wrong OTP verified! Please check the OTP  recived by the given phone number",
            type: "error",
          });
        });
    }
  };

  return (
    <div className="login-page-parent">
      <div id="login-form-wrap">
        <h2>Login</h2>
        <form id="login-form">
          {phnostatus.msg && (
            <Alert
              variant="filled"
              severity={phnostatus.type}
              className="login-alert"
            >
              {phnostatus.msg}
            </Alert>
          )}
          {/* <p>
                        <input type="text" id="username" name="username" placeholder="Username" required />
                    </p>
                    <p>
                        <input type="email" id="email" name="email" placeholder="Email Address" required />
                    </p> */}
          <p>
            <PhoneNumber
              value={phno}
              setValue={handleChangePhno}
              inputProps={{
                disabled: loginstate,
                name: "phno",
                required: true,
                autoFocus: true,
              }}
            />
            <i className="validation">
              <span></span>
              <span></span>
            </i>
          </p>
          {!otpreq && !loginstate && (
            <p>
              {/* <input type="submit" id="login" value="Login" /> */}
              <button type="button" id="otpbutton" onClick={checkUser}>
                Request OTP
              </button>
            </p>
          )}
          {otpreq && (
            <>
              <TextField
                id="outlined-number"
                label="OTP"
                type="number"
                value={otp}
                onChange={verifyOTP}
                required
                // InputLabelProps={{
                //   shrink: true,
                // }}
              />
            </>
          )}

          <div id="recaptcha-container"></div>
          {Boolean(currentUser) ? (
            <Navigate to="/" state={{ from: location }} replace />
          ) : (
            <></>
          )}
        </form>
        <div id="create-account-wrap">
          <p>
            Not a member? <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
