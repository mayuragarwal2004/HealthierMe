import React, { useState, useEffect } from "react";
import { auth, app } from "../../base";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useAuth } from "../context/auth/AuthState";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PhoneNumber from "./PhoneNumber";

const Login = () => {
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
    setphnostatus({ msg: "Finding if the number is registered", type: "info" });

    requestOTP()

    // remove the following after adding the main function
    // let sampleFunction = new Promise(function (myResolve, myReject) {
    //   myResolve(true);
    // });

    // call backend to set the value of isRegistered to true or false

    // sampleFunction().then((value) =>
    //   Boolean(value)
    //     ? requestOTP()
    //     : setphnostatus({
    //         msg: "Phone Number could not be found",
    //         type: "error",
    //       })
    // );
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
    <form className="auth-form">
      <div className="field">
        <label htmlFor="phno">
          Phone Number<span className="required-star">*</span>
        </label>
        <br />
        <PhoneNumber
          value={phno}
          setValue={handleChangePhno}
          inputProps={{
            disabled: loginstate,
            name: "phno",
            required: true,
          }}
        />

        {!otpreq && !loginstate && (
          <button type="button" id="otpbutton" onClick={checkUser}>
            Request OTP
          </button>
        )}
        {otpreq && (
          <input
            type="number"
            value={otp}
            onChange={verifyOTP}
            placeholder="Enter OTP"
          />
        )}
        {phnostatus.msg && (
          <Alert variant="filled" severity={phnostatus.type}>
            {phnostatus.msg}
          </Alert>
        )}
      </div>
      <div id="recaptcha-container"></div>
      {Boolean(currentUser) ? (
        <Navigate to="/" state={{ from: location }} replace />
      ) : (
        <></>
      )}
    </form>
  );
};

export default Login;
