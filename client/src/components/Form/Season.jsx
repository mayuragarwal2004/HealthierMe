import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { generateUUID } from "../helpers/uuidgenerator.js";
import { useData } from "../context/data/DataState";
import { challengeObj } from "./ChallengeBlock.jsx";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";

export const Season = ({ formStates, setFormStates }) => {
  const { data, editFlag, communityNo, seasonNo, setseasonNo } = useData();

  const handleChange = (name, value) => {
    setFormStates((prev) => {
      return { ...prev, season: { ...prev.season, [name]: value } };
    });
  };

  const handleSeasonChange = (event) => {
    handleChange("seasonId", event.target.value);
    const index = formStates.seasonArray.findIndex(
      (season) => season.sId === formStates.season.sId
    );
    setseasonNo(index);
    if (event.target.value === "new") {
      setFormStates((prev) => {
        return {
          ...prev,
          seasonId: event.target.value,
          season: {
            sId: "s" + String(generateUUID()),
            sName: "",
            sStart: "",
            sEnd: "",
            challengeNo: 1,
          },
          challenge: [{ ...challengeObj(generateUUID()) }],
        };
      });
      handleChange("season", {});
    } else {
      let seasonObj = formStates.seasonArray.filter((s) => {
        return s.sId === event.target.value;
      })[0];
      console.log({ seasonObj });
      setFormStates((prev) => {
        return {
          ...prev,
          seasonId: event.target.value,
          season: { ...seasonObj },
          challenge: data.community[communityNo].season[index]?.challenge,
        };
      });
    }
  };

  return (
    <div>
      <h1>Season</h1>
      {/* sName: '', sStart: '', sEnd: '', challengeNo:'' */}
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">
          Choose a Season
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={formStates.seasonId}
          onChange={handleSeasonChange}
        >
          <MenuItem value={"new"}>Create New</MenuItem>
          {formStates.seasonArray.map((s) => {
            return <MenuItem value={s.sId}>{s.sName}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <br />
      <TextField
        id="sName"
        label="Season Name"
        variant="filled"
        size="small"
        name="sName"
        required
        value={formStates.season.sName}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <br />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
          <DateTimePicker
            id="sStart"
            name="sStart"
            label="Start Date Time"
            value={dayjs(formStates.season.sStart)}
            onChange={(newValue) => handleChange("sStart", new Date(newValue))}
          />
          <DateTimePicker
            id="sEnd"
            name="sEnd"
            label="End Date Time"
            value={dayjs(formStates.season.sEnd)}
            onChange={(newValue) => handleChange("sEnd", new Date(newValue))}
          />
        </DemoContainer>
      </LocalizationProvider>
      {/* **** Start date < End date */}
      <br />
      <br />
    </div>
  );
};
