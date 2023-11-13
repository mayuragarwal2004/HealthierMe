import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { UserSignUp } from "../backendRequests/functionUtils";

import { useAuth } from "../context/auth/AuthState";

const SignUp = () => {
  const { currentUser } = useAuth();
  const [signUpData, setsignUpData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: null,
    gender: "Female",
    locality: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  const [stepCounter, setStepCounter] = useState(0);

  const personalDetails = () => {
    return (
      <>
        <div>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            value={signUpData.firstName}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            name="firstName"
            required
            margin="dense"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Middle Name"
            name="middleName"
            value={signUpData.middleName}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            variant="outlined"
            margin="dense"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Last Name"
            name="lastName"
            value={signUpData.lastName}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            variant="outlined"
            required
            margin="dense"
          />
        </div>
        <div>
          <TextField
            margin="normal"
            id="outlined-basic"
            label="Email Address"
            value={signUpData.email}
            name="email"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            variant="outlined"
            type="email"
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                id="dob"
                name="dob"
                label="Date of Birth"
                value={signUpData.dob ? dayjs(signUpData.dob) : null}
                onChange={(newValue) => handleChange("dob", new Date(newValue))}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div>
          <Button
            variant="contained"
            color="success"
            onClick={() => setStepCounter(1)}
            style={{ marginTop: "10px" }}
            endIcon={<ArrowForwardIosIcon />}
          >
            Next
          </Button>
        </div>
      </>
    );
  };

  const handleChange = (name, value) => {
    setsignUpData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ageLimit = 18; // set the age limit to 18 years
    const dob = new Date(signUpData.dob); // convert the date of birth to a Date object
    const today = new Date(); // get today's date
    const age = today.getFullYear() - dob.getFullYear(); // calculate the age
    if (age < ageLimit) {
      alert(`You must be at least ${ageLimit} years old to sign up.`);
      return;
    }
    validateSignUpData();
    // continue with form submission
  };
  const validateSignUpData = () => {
    const requiredFields = ["firstName", "lastName", "email", "gender"];
    const missingFields = requiredFields.filter(
      (field) => !signUpData[field] || signUpData[field].trim() === ""
    );
    if (!currentUser?.uid) {
      alert("Please refresh the page");
      return false;
    }
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return false;
    } else {
      UserSignUp({
        uid: currentUser.uid,
        firstName: signUpData.firstName,
        middleName: signUpData.middleName,
        lastName: signUpData.lastName,
        email: signUpData.email,
        phone: currentUser.phoneNumber,
        dob: signUpData.dob,
        gender: signUpData.gender,
        address: {
          locality: signUpData.locality,
          pincode: signUpData.pincode,
          country: signUpData.country,
          state: signUpData.state,
          city: signUpData.city,
        },
      }).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          alert("Form submitted successfully.");
        } else {
          alert("Failed to sign up user");
        }
      });
    }
    return true;
  };
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      setCountries(response.data.data);
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (event, value) => {
    console.log({ country: value.country });
    if (value) {
      const response = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/states`,
        { country: value.country }
      );
      console.log({ response });
      // return
      // const data = response.data.data.states.map((state) => {
      //   return { label: state.name, value: state.name };
      // });
      setStates(response.data.data.states);
      handleChange("country", value.country);
    } else {
      setStates([]);
      setCities([]);
      handleChange("country", "");
      handleChange("state", "");
      handleChange("city", "");
    }
  };

  const handleStateChange = async (event, value) => {
    console.log({ state: value.name });
    if (value) {
      const response = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/state/cities`,
        { country: signUpData.country, state: value.name }
      );
      setCities(response.data.data);
      handleChange("state", value.name);
    } else {
      setCities([]);
      handleChange("state", "");
      handleChange("city", "");
    }
  };

  const handleCityChange = (event, value) => {
    if (value) {
      handleChange("city", value);
    } else {
      handleChange("city", "");
    }
  };

  const addressDetails = () => {
    return (
      <>
        <div>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender *</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Female"
              name="radio-buttons-group"
              value={signUpData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <TextField
            margin="normal"
            id="outlined-basic"
            label="Locality"
            value={signUpData.locality}
            name="locality"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            margin="normal"
            id="outlined-basic"
            label="Pincode"
            value={signUpData.pincode}
            name="pincode"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            variant="outlined"
          />
        </div>
        <div>
          <Autocomplete
            options={countries}
            getOptionLabel={(option) => option.country}
            onChange={handleCountryChange}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                label="Country"
                variant="outlined"
              />
            )}
          />
        </div>
        <div>
          <Autocomplete
            options={states}
            getOptionLabel={(option) => option.name}
            onChange={handleStateChange}
            fullWidth={false}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                label="State"
                variant="outlined"
              />
            )}
          />
        </div>
        <div>
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option}
            onChange={handleCityChange}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                label="City"
                variant="outlined"
              />
            )}
          />
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => setStepCounter(0)}
            color="success"
            startIcon={<ArrowBackIosIcon />}
            style={{ marginRight: "10px" }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="success"
            style={{ marginLeft: "10px" }}
          >
            Submit
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      {stepCounter === 0 && personalDetails()}
      {stepCounter === 1 && addressDetails()}
    </>
  );
};
export default SignUp;
