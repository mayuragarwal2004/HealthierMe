const { query } = require("express");
const con = require("../../connection.sql");
var mysql = require("mysql");
const { verifyUserCommunity } = require("../community/community.queries.sql");

const readTaskByTid = async(tId) =>{
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Tasks WHERE task_id='${tId}' `,
      function (err, result, fields) {
        if (err) {
          reject(err);
        } else resolve(result);
      }
    );
  }).catch((err) => {
    console.log(err);
    return -1;
  });

  return queryResult[0];
  }

const readTaskByCid = async(cId) =>{
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Tasks WHERE challenge_id='${cId}' `,
      function (err, result, fields) {
        if (err) {
          reject(err);
        } else resolve(result);
      }
    );
  }).catch((err) => {
    console.log("hey")
    console.log(err);
    return -1;
  });

  return queryResult[0];
  }

const validateTask = async(tItem) =>{
    if(!tItem.tId || !tItem.tName || !tItem.tDesc || !tItem.tQuant || !tItem.tUnit || !tItem.tPeriodUnit || !tItem.tTC || !tItem.tStart || !tItem.tEnd){
        return false
    }

    //add group id validation

    if(await readTaskByTid(tItem.tId))
  {
        return false
    }
    return true

}

const createCTask = async (cId, taskArr) => {

  for (let i  = 0; i<taskArr.length; i++){

    const {tId, tName, tDesc, tQuant, tUnit, tPeriodUnit, tTC, tStart, tEnd, gId} = taskArr[i]
    let mainGId = ""
    let sqlGId = ""
    if (gId) {
      sqlGId = ", " + "g_id";
      mainGId = ", \'" + gId + "\'";
    }
  queryResult = await new Promise((resolve, reject)=>{
    con.query(
      `INSERT INTO HealthierMe.Tasks
      (task_id, challenge_id, task_name, task_description, task_quantity, task_unit, task_period_unit, times_to_complete, start_date, end_date${sqlGId} ) 
      VALUES 
      ('${tId}', '${cId}', '${tName}', '${tDesc}', '${tQuant}', '${tUnit}', '${tPeriodUnit}', '${tTC}', '${tStart}', '${tEnd}' ${mainGId} );
       `,
      function (err, result, fields) {
        if (err) {
          reject(err) 
          }
        else resolve(result);
      }
    )
  }).catch((err)=>{
    console.log(err)
    return -1;
  })

    if(queryResult == -1){
      return -1;
     }
  }
  
  return true

};

const listTasks = async (challengeId) => {
  if (!challengeId) {
    return 0;
  }

  try {
    // const verification = await verifyUserCommunity(uID, communityId);
    // if (!verification) {
    //   return -2;
    // }
    // if (verification == -1) {
    //   return -1;
    // }

    const queryResult = await new Promise((resolve, reject) => {
      con.query(
        `SELECT T.task_id, T.task_name, T.task_description, T.task_quantity, T.task_unit, T.task_period_unit, T.times_to_complete, T.start_date, T.end_date
        FROM HealthierMe.Tasks AS T
        WHERE T.challenge_id = '${challengeId}';`,
        (err, result, fields) => {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }

          resolve(result);
        }
      );
    });

    return queryResult;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

module.exports = { createCTask, validateTask, listTasks, readTaskByTid, readTaskByCid };
