import { generateUUID } from "../../components/helpers/uuidgenerator";
export const ChallengeBlock = ({ ch, i, formStates, setFormStates }) => {
  const handleChange = (i, e) => {
    // targetFocus = e.target
    // e.preventDefault();
    setFormStates((prev) => {
      // let cIdFound = target.parentElement.id
      let cArr = prev.challenge;
      cArr[i] = { ...cArr[i], [e.target.name]: e.target.value };
      return { ...prev, challenge: [...cArr] };
    });
  };

  const deleteChallenge = (i) => {
    setFormStates((prev) => {
      let chNo = prev.season.challengeNo;
      let chObj = [...prev.challenge];
      chObj.splice(i, 1);
      let newObj = {
        ...prev,
        season: { ...prev.season, challengeNo: chNo - 1 },
        challenge: [...chObj],
      };
      return newObj;
    });
  };

  return (
    <div id={i}>
      <p>Challenge no. {i + 1}</p>

      {/* <input type="text" placeholder="hey" onBlur={()=>console.log(onmouseout)}/> */}

      <input
        type="text"
        name="cName"
        id="cName"
        placeholder="Name"
        onChange={(e) => handleChange(i, e)}
        value={ch.cName}
      />
      <br />

      <textarea
        name="cDesc"
        id="cDesc"
        placeholder="Description"
        onChange={(e) => handleChange(i, e)}
        value={ch.cDesc}
      />
      <br />

      <label htmlFor="cStart">Start Time (date and time):</label>
      <input
        type="datetime-local"
        id="cStart"
        name="cStart"
        onChange={(e) => handleChange(i, e)}
        value={ch.cStart}
      ></input>
      <br />

      <label htmlFor="cEnd">End Time (date and time):</label>
      <input
        type="datetime-local"
        id="cEnd"
        name="cEnd"
        onChange={(e) => handleChange(i, e)}
        value={ch.cEnd}
      ></input>
      <br />
      {/* **** Start date < End date */}
      <br />
      <button
        style={{ backgroundColor: "#FFCCCB" }}
        onClick={() => deleteChallenge(i)}
      >
        Delete Challenge
      </button>
      {/* <button onClick={()=>deleteChallenge(i)}>Delete</button> */}
      <br />
      <br />
    </div>
  );
};

export const addChallenge = (setFormStates) => {
  setFormStates((prev) => {
    let chNo = prev.season.challengeNo;
    let newObj = {
      ...prev,
      season: { ...prev.season, challengeNo: chNo + 1 },
      challenge: [...prev.challenge, { ...challengeObj(generateUUID()) }],
    };
    return newObj;
  });
};

export const challengeObj = (uid) => {
  return {
    cId: "c" + String(uid),
    cName: "",
    cDesc: "",
    cStart: "",
    cEnd: "",
    task: [],
    event: [],
    group: [],
  };
};
