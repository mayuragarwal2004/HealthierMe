// {
//     taskId : "t1687186312943",
//     tName : 'walking',
//     tDesc : 'walk 3000 unit steps daily for 21 days',
//     tQuant : 3000,
//     tUnit : "units",
//     tPeriod : 1
//     tPeriodUnit : "day"
//     tNumber : 1,
//     tTC : 21 ,
//     tStart:"2023-06-19T20:24",
//     tEnd:"2023-06-20T20:24",
//     compul : true
// }
import {generateUUID} from '../../components/helpers/uuidgenerator'
import { deleteTaskGroup } from "./Group";

export const Task = ({ formStates, setFormStates, i, j, taskItem }) => {
  const handleChange = (i, j, e) => {
    // e.preventDefault();
    setFormStates((prev) => {
      let cArr = [...prev.challenge];
      let tArr = cArr[i].task;
      tArr[j] = { ...tArr[j], [e.target.name]: e.target.value };
      return { ...prev, challenge: [...cArr] };
    });

    //Handle change without affecting the previous state array
    // setFormStates((prev)=>{
    //     let cArr = [...prev.challenge]
    //     let tArr = [...cArr[i].task]
    //     tArr[j] = {...tArr[j], [e.target.name] : e.target.value}
    //     cArr[i] = {...prev.challenge[i], task : [...tArr] }
    //     return ({...prev, challenge: [...cArr  ]})})
  };

  const deleteTask = (i, j) => {
    if (taskItem.gId) {
      deleteTaskGroup(i, taskItem.gId, setFormStates, taskItem.tId);
    }

    setFormStates((prev) => {
      let cArr = [...prev.challenge];
      let tArr = [...cArr[i].task];
      tArr.splice(j, 1);
      cArr[i] = { ...cArr[i], task: [...tArr] };
      let newObj = { ...prev, challenge: [...cArr] };
      return newObj;
    });
  };

  let s = (taskItem.tPeriodUnit == 'daily') ? "days" : (taskItem.tPeriodUnit == 'monthly') ? "months" : "weeks"
  

  return (
    <>
      <div id={j}>
        <h5>Task no. {j + 1}</h5>

        {/* <input type="text" placeholder="hey" onBlur={()=>console.log(onmouseout)}/> */}
        <label htmlFor="tName">Task Name </label>
        <input
          type="text"
          name="tName"
          id="tName"
          placeholder="Walking"
          onChange={(e) => handleChange(i, j, e)}
          value={taskItem.tName}
        />
        <br />
        <br />

        <label htmlFor="tStart">Start Time (date and time):</label>
        <input
          type="datetime-local"
          id="tStart"
          name="tStart"
          onChange={(e) => handleChange(i, j, e)}
          value={taskItem.tStart}
        ></input>
        <br />

        <label htmlFor="tEnd">End Time (date and time):</label>
        <input
          type="datetime-local"
          id="tEnd"
          name="tEnd"
          onChange={(e) => handleChange(i, j, e)}
          value={taskItem.tEnd}
        ></input>
  
        {/* **** Start date < End date */}
        <br /><br />

        <label htmlFor="tDesc">Task Description </label>
        <textarea
          name="tDesc"
          id="tDesc"
          placeholder="Walk 2000 steps a day ...."
          onChange={(e) => handleChange(i, j, e)}
          value={taskItem.tDesc}
        />
        <br />
        <br />

        <label htmlFor="tQuant">
          Task Quantity
        </label>
        <input
          type="number"
          name="tQuant"
          id="tQuant"
          min="0"
          value={taskItem.tQuant}
          onChange={(e) => handleChange(i, j, e)}
        />
        <select
          value={taskItem.tUnit}
          name="tUnit"
          id="tUnit"
          onChange={(e) => handleChange(i, j, e)}
        >
          <option value="steps">steps</option>
          <option value="skips">skips</option>
          <option value="units">units</option>
          <option value="times">times</option>
          <option value="seconds">seconds</option>
          <option value="minutes">minutes</option>
          <option value="metres">metres</option>
          <option value="kilometres">kilometres</option>
        </select>
        {/* <br /><br /> */}

        {/* <label htmlFor="tPeriod">Task Period (Task quantity to be done how frequently? )</label>
        <input
          type="number"
          name="tPeriod"
          id="tPeriod"
          min="0"
          value={taskItem.tPeriod}
          onChange={(e) => handleChange(i, j, e)}
        /> */}
        <select
          value={taskItem.tPeriodUnit}
          name="tPeriodUnit"
          id="tPeriodUnit"
          onChange={(e) => handleChange(i, j, e)}
        >
          <option value="daily">daily</option>
          <option value="weekly">weekly</option>
          <option value="monthly">monthly</option>
        </select>
        <br />
        <br />

        {/* <label htmlFor="tNumber">Task Number (How many times should the task be done in the given period? )</label>
        <input
          type="number"
          name="tNumber"
          id="tNumber"
          min="0"
          value={taskItem.tNumber}
          onChange={(e) => handleChange(i, j, e)}
        />
        <br /><br /> */}
        <label htmlFor="tTC">
          TimesToComplete (Period for the task to be done? )
        </label>
        <input
          type="number"
          name="tTC"
          id="tTC"
          min="0" 
          value={taskItem.tTC}
          onChange={(e) => handleChange(i, j, e)}
        />
        {s}

        <br /><br />

        {/* <b>
          <i>
            {`${taskItem.tName} ${taskItem.tQuant} ${taskItem.tUnit} ${
              taskItem.tNumber
            } ${taskItem.tNumber > 1 ? `times` : `time`} in ${
              taskItem.tPeriod
            } ${taskItem.tPeriodUnit}${taskItem.tPeriod > 1 ? "s" : ""} for ${
              taskItem.tTC
            } days`}
          </i>
        </b> */}

<b>
          <i>
            {`${taskItem.tName} ${taskItem.tQuant} ${taskItem.tUnit}  ${taskItem.tPeriodUnit}${taskItem.tPeriod > 1 ? "s" : ""} for ${
              taskItem.tTC
            } ${s}`}
          </i>
        </b>

        <br /><br />
        <button
          style={{ backgroundColor: "#FFEAE9" }}
          onClick={() => deleteTask(i, j)}
        >
          Delete Task
        </button>
        <br />
      </div>
    </>
  );
};

export const taskObj = (taskId, gId) => {
  return {
    tId: taskId,
    tName: "",
    tDesc: "",
    tQuant: 0,
    tUnit: "units",
    tPeriodUnit: "daily",
    tTC: 0,
    tStart: "",
    tEnd: "",
    gId: gId,
  };
};

export const addTask = (i, setFormStates, gId) => {
  let taskId = "t" + String(generateUUID());
  setFormStates((prev) => {
    let chArr = [...prev.challenge];
    chArr[i] = {
      ...chArr[i],
      task: [...chArr[i].task, { ...taskObj(taskId, gId) }],
    };
    let newObj = { ...prev, challenge: [...chArr] };

    return newObj;
  });
  return taskId;
};
