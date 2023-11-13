const con = require("../../connection.sql");
var mysql = require("mysql");
const { verifyUserCommunity } = require("../community/community.queries.sql");

const Challenge = require("./challenge.model");
const Event = require("../events/event.model");
const Task = require("../tasks/task.model");
const Group = require("../groups/group.model");

const readChallenge = async (cId) => {
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Challenges WHERE challenge_id='${cId}' `,
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
};

const validateChallenge = async (cObj) => {
  if (
    !cObj.cId ||
    !cObj.cName ||
    !cObj.cDesc ||
    !cObj.cStart ||
    !cObj.cEnd ||
    !cObj.active ||
    !cObj.userId ||
    !cObj.desc
  ) {
    return false;
  }
  try {
    if (
      (await readChallenge(cObj.cId)) 
      // ||
      // (await Task.findOne({ cId: cObj.cId })) ||
      // (await Event.findOne({ cId: cObj.cId })) ||
      // (await Group.findOne({ cId: cObj.cId }))
    ) {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
};

const createChallenge = async (sId, cObj) => {
  const {cId, cName, cDesc, cStart, cEnd, active, userId} = cObj

  queryResult = await new Promise((resolve, reject)=>{
    con.query(
      `INSERT INTO HealthierMe.Challenges
      (challenge_id, created_by, challenge_name, description, start_date, end_date, season_id, active) 
      VALUES 
      ('${cId}', '${userId}', '${cName}', '${cDesc}', '${cStart}', '${cEnd}', '${sId}','${active}');
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
  }
    )
  return queryResult
};

const listChallenges = async (seasonId) => {
  // if (!uID || !communityId) {
  //   return 0;
  // }

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
        `SELECT C.challenge_id, C.challenge_name, C.description, C.start_date, C.end_date, C.active, C.last_updated
        FROM HealthierMe.Challenges AS C
        WHERE C.season_id = '${seasonId}';`,
        (err, result, fields) => {
          if (err) {
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

module.exports = {
  validateChallenge,
  createChallenge,
  readChallenge,
  listChallenges,
};
