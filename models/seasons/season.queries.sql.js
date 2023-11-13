const Season = require("./season.model");
const con = require("../../connection.sql");
var mysql = require("mysql");
const { verifyUserCommunity } = require("../community/community.queries.sql");

const readSeason = async (sId) => {

  queryResult = await new Promise((resolve, reject)=>{
    con.query(
      `SELECT * FROM HealthierMe.Seasons WHERE season_id='${sId}' `,
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
  
  return queryResult[0]
  
};

const validateSeason = async (seasonObj) => {
  if (
    !seasonObj.sId ||
    !seasonObj.sName ||
    !seasonObj.sStart ||
    !seasonObj.sEnd ||
    !seasonObj.active ||     
    !seasonObj.userId ||
    !seasonObj.desc

  ) {
    return false;
  }

  if (await readSeason(seasonObj.sId)) {
    return false;
  }

  return true;
};

const createSeason = async (sObj) => {
  const {sId, sName, sStart, sEnd, challengeNo, active, userId, desc } = sObj

  queryResult = await new Promise((resolve, reject)=>{
    con.query(
      `INSERT INTO HealthierMe.Seasons
      (season_id, name, start_date, end_date, num_challenges, active, created_by_user_id, description) 
      VALUES 
      ('${sId}', '${sName}', '${sStart}', '${sEnd}', '${challengeNo}', '${active}', '${userId}', '${desc}');
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

const listSeasons = async (communityId) => {

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
        `SELECT S.season_id, S.name, S.description, S.start_date, S.end_date, S.active, S.last_updated
        FROM HealthierMe.Seasons AS S
        JOIN HealthierMe.CommunitySeasonMapping AS CSM ON S.season_id = CSM.season_id
        JOIN HealthierMe.Community AS C ON CSM.community_id = C.community_id
        WHERE C.community_id = '${communityId}';`,
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

module.exports = { createSeason, validateSeason, readSeason, listSeasons };


