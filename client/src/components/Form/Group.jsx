// {
//     groupId : "g1687186319821",
//     NumOpts : 1,
//     minToComp : 1,
//     task:[],
//     event:[]
// }
import {generateUUID} from '../../components/helpers/uuidgenerator'

export const Group = ({ groupItem, formStates, setFormStates, i, j }) => {
  const handleChange = (i, j, e) => {
    // e.preventDefault();
    setFormStates((prev) => {
      let cArr = [...prev.challenge];
      let gArr = cArr[i].group;
      gArr[j] = { ...gArr[j], [e.target.name]: e.target.value };
      return { ...prev, challenge: [...cArr] };
    });
  };

  const deleteGroup = (i, j) => {
    if (groupItem.numOpts == 0) {
      setFormStates((prev) => {
        let cArr = [...prev.challenge];
        let gArr = [...cArr[i].group];
        gArr.splice(j, 1);
        cArr[i] = { ...cArr[i], group: [...gArr] };
        let newObj = { ...prev, challenge: [...cArr] };
        return newObj;
      });
    }
  };

  return (
    <>
      <div id={j}>
        <h5>Group no. {j + 1}</h5>

        <input type="text" name="gName" id = 'gName' placeholder="GroupName" onChange={(e)=>handleChange(i, j ,e)} value={groupItem.gName}/>
        <br />

        <p>Number of options: {groupItem.numOpts}</p>
        <label htmlFor="minToComp">Miniumum to Complete</label>
        <input
          type="number"
          name="minToComp"
          id="minToComp"
          min="0"
          max={groupItem.numOpts}
          placeholder="Minimum to Comply"
          value={groupItem.minToComp}
          onChange={(e) => handleChange(i, j, e)}
        />
        <br />
        <button
          style={{ backgroundColor: "#FFEAE9" }}
          onClick={() => deleteGroup(i, j)}
        >
          Delete Group
        </button>
        {/* <input type="text" placeholder="hey" onBlur={()=>console.log(onmouseout)}/> */}
      </div>
    </>
  );
};

export const groupObj = (timestamp) => {
  return {
    gId: "g" + String(timestamp),
    gName:"",
    numOpts: 0,
    minToComp: 0,
    taskIds: [],
    eventIds: [],
  };
};

export const addGroup = (i, setFormStates) => {
  setFormStates((prev) => {
    let chArr = [...prev.challenge];
    chArr[i] = {
      ...chArr[i],
      group: [...chArr[i].group, { ...groupObj(generateUUID()) }],
    };
    let newObj = { ...prev, challenge: [...chArr] };

    return newObj;
  });
};

//add taskIds into group arr
export const addTaskGroup = (i, j, setFormStates, tId) => {
  setFormStates((prev) => {
    let cArr = [...prev.challenge];
    let gArr = [...cArr[i].group];
    let gObj = { ...gArr[j] };
    gObj = {
      ...gObj,
      numOpts: gObj.numOpts + 1,
      taskIds: [...gObj.taskIds, tId],
    };
    gArr[j] = gObj;
    cArr[i] = { ...cArr[i], group: gArr };
    // cArr[i].group[j] = gObj;
    return { ...prev, challenge: [...cArr] };
  });
};

//add eventIds into group arr
export const addEventGroup = (i, j, setFormStates, eId) => {
  setFormStates((prev) => {
    let cArr = [...prev.challenge];
    let gArr = [...cArr[i].group];
    let gObj = { ...gArr[j] };
    gObj = {
      ...gObj,
      numOpts: gObj.numOpts + 1,
      eventIds: [...gObj.eventIds, eId],
    };
    gArr[j] = gObj;
    cArr[i] = { ...cArr[i], group: gArr };
    // cArr[i].group[j] = gObj;
    return { ...prev, challenge: [...cArr] };
  });
};

//delete taskIds from group arr
export const deleteTaskGroup = (i, gId, setFormStates, tId) => {
  setFormStates((prev) => {
    let cArr = [...prev.challenge];
    let gArr = [...cArr[i].group];
    let j;
    gArr.map((item, index) => {
      if ((item.gId = gId)) {
        j = index;
      }
    });
    let gObj = { ...gArr[j] };
    let taskIdsArr = [...gObj.taskIds];
    taskIdsArr = taskIdsArr.filter((id) => {
      if (id == tId) {
        return false;
      } else {
        return true;
      }
    });
    gObj = { ...gObj, numOpts: gObj.numOpts - 1, taskIds: [...taskIdsArr] };
    gArr[j] = gObj;
    cArr[i] = { ...cArr[i], group: gArr };
    // cArr[i].group[j] = gObj;
    return { ...prev, challenge: [...cArr] };
  });
};

//delete eventIds from group arr
export const deleteEventGroup = (i, gId, setFormStates, eId) => {
  setFormStates((prev) => {
    let cArr = [...prev.challenge];
    let gArr = [...cArr[i].group];
    let j;
    gArr.map((item, index) => {
      if ((item.gId = gId)) {
        j = index;
      }
    });
    let gObj = { ...gArr[j] };
    let eventIdsArr = [...gObj.eventIds];
    eventIdsArr = eventIdsArr.filter((id) => {
      if (id == eId) {
        return false;
      } else {
        return true;
      }
    });
    gObj = { ...gObj, numOpts: gObj.numOpts - 1, eventIds: [...eventIdsArr] };
    gArr[j] = gObj;
    cArr[i] = { ...cArr[i], group: gArr };
    // cArr[i].group[j] = gObj;
    return { ...prev, challenge: [...cArr] };
  });
};
