import React from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Community = ({ formStates, setFormStates }) => {
  const handleChange = (name, value) => {
    setFormStates((prev) => {
      return { ...prev, community: { ...prev.community, [name]: value } };
    });
  };
  return (
    <div>
      <h1>Community</h1>
      <TextField
        id="filled-basic"
        label="Community Name"
        variant="filled"
        name="cName"
        required
        size="small"
        className="community-field"
        value={formStates.community.cName}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="Community Description"
        variant="filled"
        name="cDesc"
        size="small"
        className="community-field"
        required
        multiline
        rows={4}
        value={formStates.community.cDesc}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Join Access</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="community-field"
          value={formStates.community.access}
          label="Join Access"
          size="small"
          required
          name="access"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        >
          <MenuItem value={"Open"}>Open</MenuItem>
          <MenuItem value={"Admin_control"} disabled>
            Admin_control
          </MenuItem>
          <MenuItem value={"Predefined"} disabled>
            Predefined
          </MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="filled-basic"
        label="Locality"
        className="community-field"
        variant="filled"
        name="locality"
        required
        size="small"
        value={formStates.community.locality}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <TextField
        id="filled-basic"
        className="community-field"
        label="Pincode"
        variant="filled"
        name="pincode"
        size="small"
        required
        type="number"
        value={formStates.community.pincode}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <TextField
        id="filled-basic"
        className="community-field"
        label="City"
        variant="filled"
        name="city"
        required
        size="small"
        value={formStates.community.city}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <TextField
        id="filled-basic"
        className="community-field"
        label="State"
        variant="filled"
        name="state"
        size="small"
        required
        value={formStates.community.state}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
    </div>
  );
};

export default Community;
