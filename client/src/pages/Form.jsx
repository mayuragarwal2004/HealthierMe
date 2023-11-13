import { Season } from "../components/Form/Season";
import { Challenge } from "../components/Form/Challenge";
import { challengeObj } from "../components/Form/ChallengeBlock";
import { useEffect, useState } from "react";
import { generateUUID } from "../components/helpers/uuidgenerator.js";
import Community from "../components/Form/Community";
import { useData } from "../components/context/data/DataState";
import "./Form.css";

export const Form = () => {
  const { data, editFlag, communityNo, seasonNo } = useData();
  let [formStates, setFormStates] = useState({
    step: 1,
    community: {
      cId: "o" + String(generateUUID()),
      cName: "",
      cDesc: "",
      locality: "",
      pincode: "",
      city: "",
      state: "",
      access: "Open",
    },
    seasonArray: [],
    seasonId: "new",
    season: {
      sId: "s" + String(generateUUID()),
      sName: "",
      sStart: "",
      sEnd: "",
      challengeNo: 1,
    },
    challenge: [{ ...challengeObj(generateUUID()) }],
  });

  console.log({ formStates });

  useEffect(() => {
    if(editFlag){
      setFormStates({
        step: 1,
        community: {
          cId: data.community[communityNo].cId,
          cName: data.community[communityNo].cName,
          cDesc: data.community[communityNo].cDesc,
          locality: data.community[communityNo].locality,
          pincode: data.community[communityNo].pincode,
          city: data.community[communityNo].city,
          state: data.community[communityNo].state,
          access: data.community[communityNo].access,
        },
        seasonArray: data.community[communityNo].season,
        seasonId: "new",
        season: {
          sId: "s" + String(generateUUID()),
          sName: "",
          sStart: "",
          sEnd: "",
          challengeNo: 1,
        },
        challenge: [{ ...challengeObj(generateUUID()) }],
      });
      if (seasonNo !== -1) {
        setFormStates((prev) => ({
          ...prev,
          season: {
            ...prev.season,
            sId: data.community[communityNo].season[seasonNo].sId,
            sName: data.community[communityNo].season[seasonNo].sName,
            sStart: data.community[communityNo].season[seasonNo].sStart,
            sEnd: data.community[communityNo].season[seasonNo].sEnd,
            challengeNo: data.community[communityNo].season[seasonNo].challenge.length,
          },
          seasonId: data.community[communityNo].season[seasonNo].sId,
        }));
      }
    }
  }, []);

  let prevStep = (e) => {
    e.preventDefault();
    if (formStates.step > 1) {
      setFormStates((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  let nextStep = (e) => {
    e.preventDefault();
    if (formStates.step < 3) {
      setFormStates((prev) => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const select = (fSS) => {
    switch (fSS) {
      case 1:
        return (
          <Community formStates={formStates} setFormStates={setFormStates} />
        );
      case 2:
        return <Season formStates={formStates} setFormStates={setFormStates} />;
      case 3:
        return (
          <Challenge formStates={formStates} setFormStates={setFormStates} />
        );
      default:
        return "Case not defined";
      // case 3: return <Task formStates = {formStates} setFormStates={setFormStates} />
      // case 4: return  <Event formStates = {formStates} setFormStates={setFormStates} />
    }
  };

  return (
    <div className="admin-form-parent">
      {select(formStates.step)}
      <button onClick={prevStep}>Prev</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};
