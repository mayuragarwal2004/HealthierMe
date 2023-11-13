const con = require("../../connection.sql");
var mysql = require("mysql");
const { verifyUserCommunity } = require("../community/community.queries.sql");

const readEventByEid = async (eId) => {
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Events WHERE event_id='${eId}' `,
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

const readEventByCid = async (cId) => {
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Events WHERE challenge_id='${cId}' `,
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

const validateEvent = async (eItem) => {
  if (
    !eItem.eId ||
    !eItem.eName ||
    !eItem.eDesc ||
    !eItem.eFreq ||
    !eItem.eStart ||
    !eItem.eEnd
  ) {
    return false;
  }

  if (await readEventByEid(eItem.eId)) {
    console.log(err);
    return false;
  }

  return true;
};

const createCEvent = async (cId, eventArr) => {
  for (let i = 0; i < eventArr.length; i++) {
    const { eId, eName, eDesc, eFreq, eStart, eEnd, gId } = eventArr[i];
    let mainGId = "";
    let sqlGId = "";
    if (gId) {
      sqlGId = ", " + "g_id";
      mainGId = ", \'" + gId + "\'";
    }
    queryResult = await new Promise((resolve, reject) => {
      con.query(
        `INSERT INTO HealthierMe.Events
      (event_id, challenge_id, event_name, event_description, start_date, end_date, event_frequency${sqlGId}) 
      VALUES 
      ('${eId}', '${cId}', '${eName}', '${eDesc}', '${eStart}', '${eEnd}', '${eFreq}' ${mainGId} );
       `,
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
    if (queryResult == -1) {
      return -1;
    }
  }

  return true;
};

const listEvents = async ( challengeId) => {
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
        `SELECT E.event_id, E.event_name, E.event_description, E.start_date, E.end_date, E.event_frequency
        FROM HealthierMe.Events AS E
        WHERE E.challenge_id = '${challengeId}';`,
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
  createCEvent,
  validateEvent,
  listEvents,
  readEventByCid,
  readEventByEid,
};
