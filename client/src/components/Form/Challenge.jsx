import { useEffect } from "react";
import axios from "axios"
import { Event, addEvent } from "./Event";
import { Task, addTask } from "./Task";
import { ChallengeBlock, addChallenge } from "./ChallengeBlock";
import { Group, addGroup, addEventGroup, addTaskGroup } from "./Group";


//stop map re-render after every change - rerender only on
// OR autofocus after every re-render

export const Challenge = ({ formStates, setFormStates }) => {
  // useEffect(()=>{
  //     console.log(targetFocus)
  //     // targetFocus.autoFocus = true
  // })

  const mapChallenges = () =>
    formStates.challenge.map((ch, i) => {
      return (
        <div
          key={i}
          style={{ borderStyle: "solid", margin: "5px", padding: "5px" }}
        >
          <ChallengeBlock
            key={i}
            i={i}
            ch={ch}
            formStates={formStates}
            setFormStates={setFormStates}
          />
          {/* --------------------Task------------------------------------ */}
          <h3>Task</h3>
          {ch.task.map((taskItem, j) => {
            if (!taskItem.gId) {
              return (
                <Task
                  key={j}
                  i={i}
                  j={j}
                  formStates={formStates}
                  setFormStates={setFormStates}
                  taskItem={taskItem}
                />
              );
            }
          })}
          <button onClick={() => addTask(i, setFormStates, "")}>
            Add Task
          </button>
          {/* --------------------Event------------------------------------ */}
          <h3>Events</h3>
          {ch.event.map((eventItem, j) => {
            if (!eventItem.gId) {
              return (
                <Event
                  key={j}
                  i={i}
                  j={j}
                  formStates={formStates}
                  setFormStates={setFormStates}
                  eventItem={eventItem}
                />
              );
            }
          })}
          <button onClick={() => addEvent(i, setFormStates, "")}>
            Add Event
          </button>
          <br />
          {/* --------------------Groups------------------------------------ */}
          <h3>Groups</h3>
          {ch.group.map((groupItem, j) => (
            <div
              key={j}
              style={{
                borderStyle: "solid",
                borderRadius: "1px",
                margin: "5px",
                padding: "5px",
              }}
            >
              <Group
                key={j}
                i={i}
                j={j}
                groupItem={groupItem}
                formStates={formStates}
                setFormStates={setFormStates}
              />
              {/* --------Group Tasks------------ */}
              <h6>Group {j + 1} Tasks</h6>
              {ch.task.map((taskItem, k) => {
                if (groupItem.gId == taskItem.gId) {
                  return (
                    <Task
                      key={k}
                      i={i}
                      j={k}
                      formStates={formStates}
                      setFormStates={setFormStates}
                      taskItem={taskItem}
                    />
                  );
                }
              })}
              <button
                onClick={() => {
                  let taskId = addTask(i, setFormStates, groupItem.gId);
                  addTaskGroup(i, j, setFormStates, taskId);
                }}
              >
                Add Task
              </button>
              {/* ---------Group Events------------ */}
              <h6>Group {j + 1} Events</h6>
              {ch.event.map((eventItem, k) => {
                if (groupItem.gId == eventItem.gId) {
                  return (
                    <Event
                      key={k}
                      i={i}
                      j={k}
                      formStates={formStates}
                      setFormStates={setFormStates}
                      eventItem={eventItem}
                    />
                  );
                }
              })}
              <button
                onClick={() => {
                  let eventId = addEvent(i, setFormStates, groupItem.gId);
                  addEventGroup(i, j, setFormStates, eventId);
                }}
              >
                Add Event
              </button>{" "}
              <br />
            </div>
          ))}
          <button onClick={() => addGroup(i, setFormStates)}>Add Group</button>{" "}
          <br /> <br />
          {/* <button style={{backgroundColor:"#FFCCCB"}} onClick={()=>deleteChallenge(i)}>Delete Challenge</button> */}
        </div>
      );
    });

  return (
    <>
      <h1>Challenges</h1>

      {mapChallenges()}

      <button onClick={() => addChallenge(setFormStates)}> + </button>
      <br />
      <br />

      <input
        type="submit"
        onClick={() => {
          axios.post("http://localhost:5001/api/season/create", formStates
      )
      .then((response) => {
        alert("Form submitted successfully")
        console.log(response.data);
      }).catch((err)=>{console.log(err)})
        }}
      />
      <br />
      <br />
    </>
  );
};
