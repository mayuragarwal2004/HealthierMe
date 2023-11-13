const Group = require("./group.model");
const con = require("../../connection.sql");
const { verifyUserCommunity } = require("../community/community.queries.sql");

const readGroupByGid = async(gId) =>{
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Groups WHERE g_id='${gId}' `,
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

const readGroupByCid = async(cId) =>{
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Groups WHERE challenge_id='${cId}' `,
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

const validateGroup = async (gItem) => {
  if (
    !gItem.gId ||
    !gItem.gName ||
    !gItem.numOpts ||
    !gItem.minToComp ||
    gItem.minToComp > gItem.numOpts
  ) {
    return false;
  }

  const groupObj = await readGroupByGid(gItem.gId)

  if (groupObj == -1) {
    return -1;
  }
  if (groupObj){
    return false;
  }
 
  return true;
};

const createCGroup = async (cId, groupArr) => {
  for (let i  = 0; i<groupArr.length; i++){

    const {gId, gName, numOpts, minToComp,} = groupArr[i]

  queryResult = await new Promise((resolve, reject)=>{
    con.query(
      `INSERT INTO HealthierMe.Groups
      (g_id, challenge_id, g_name, num_opts, min_to_comp ) 
      VALUES 
      ('${gId}', '${cId}', '${gName}', '${numOpts}', '${minToComp}');
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
  }

  return true
};

const listGroups = async (challengeId) => {
  if ( !challengeId) {
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
        `SELECT G.g_id, G.num_opts, G.min_to_comp
        FROM HealthierMe.Groups AS G
        WHERE G.challenge_id = '${challengeId}';`,
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

module.exports = { createCGroup, validateGroup, readGroupByCid, readGroupByGid, listGroups };
