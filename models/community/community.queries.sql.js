const { query } = require("express");
const con = require("../../connection.sql");
var mysql = require("mysql");

const readUserCommunity = async (communityId) => {
  //query to read all users from a community
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT CommunityUserMapping.user_id, CommunityUserMapping.role, CommunityUserMapping.community_id, User.first_name, User.last_name, User.dob  FROM HealthierMe.CommunityUserMapping 
      INNER JOIN HealthierMe.User on HealthierMe.CommunityUserMapping.user_id = HealthierMe.User.user_id
      WHERE community_id='${communityId}';`,
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
  return queryResult;
};
const readCommunity = async (cId) => {
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Community WHERE community_id='${cId}' `,
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

const readCommunityByJoinCode = async (joinCode) => {
  const queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT community_id, community_name
        FROM HealthierMe.Community
        WHERE community_join_code = '${joinCode}';`,
      (err, result, fields) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      }
    );
  }).catch((err) => {
    console.log(err);
    return -1;
  });
  return queryResult[0];
};

const validateCommunity = async (cItem) => {
  if (
    !cItem.communityId ||
    !cItem.communityName ||
    !cItem.locality ||
    !cItem.pincode ||
    !cItem.city ||
    !cItem.state ||
    !cItem.userId
  ) {
    return 0;
  }

  commObj = await readCommunity(cItem.communityId);

  if (commObj == -1) {
    return -1;
  }
  if (commObj) {
    return -2;
  }
  return 1;
};

//use these parameters to create a community community_id VARCHAR(255) PRIMARY KEY,
// community_join_code VARCHAR(6) NOT NULL,
// community_name VARCHAR(255) NOT NULL,
// locality VARCHAR(255),
// pincode VARCHAR(255) NOT NULL,
// city VARCHAR(255) NOT NULL,
// state VARCHAR(255) NOT NULL,
// created_by_user_id VARCHAR(255) NOT NULL,
// created_datetime DATETIME NOT NULL,
// members_count INT DEFAULT 1,
// description TEXT,
// access ENUM('Open', 'Admin_control', 'Predefined'),

const createCommunity = async (cItem) => {
  const {
    communityId,
    joinCode,
    communityName,
    locality,
    pincode,
    city,
    state,
    userId,
    desc,
  } = cItem;
  let sql_desc = desc ? ", description" : "";
  let main_desc = desc ? `, '${desc}'` : "";
  queryResult = await new Promise((resolve, reject) => {
    //write query to create community
    con.query(
      `INSERT INTO HealthierMe.Community  
    (community_id, community_join_code, community_name, locality, pincode, city, state, created_by_user_id ${sql_desc})
    VALUES
    ('${communityId}', '${joinCode}', '${communityName}', '${locality}', '${pincode}', '${city}', '${state}', '${userId}' ${main_desc});`,
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
  return cItem;
};

const joinCommunity = async (communityId, userId, role) => {
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `INSERT INTO HealthierMe.CommunityUserMapping
      (community_id, user_id, role)
      VALUES
      ('${communityId}', '${userId}', '${role}');`,
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
  return queryResult;
};

const updateMemberCount = async (cId) => {
  const queryResult = await new Promise((resolve, reject) => {
    con.query(
      `UPDATE HealthierMe.Community
      SET members_count = members_count + 1
      WHERE community_id = '${cId}';`,
      (err, result, fields) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      }
    );
  }).catch((err) => {
    console.log(err);
    return -1;
  });
  return queryResult;
};

const allCommunities = async (uID) => {
  if (!uID) {
    return 0;
  }

  try {
    const queryResult = await new Promise((resolve, reject) => {
      con.query(
        `SELECT C.community_id, C.community_name, C.description, C.last_updated, CU.role, C.locality, C.pincode, C.city, C.state, C.access
        FROM HealthierMe.Community AS C
        INNER JOIN HealthierMe.CommunityUserMapping AS CU
        ON C.community_id = CU.community_id
        WHERE CU.user_id = '${uID}';`,
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

const verifyUserCommunity = async (uID, communityId) => {
  if (!uID || !communityId) {
    return 0;
  }

  try {
    const queryResult = await new Promise((resolve, reject) => {
      con.query(
        `SELECT COUNT(*) AS user_count
        FROM HealthierMe.CommunityUserMapping AS CU
        WHERE CU.user_id = '${uID}' AND CU.community_id = '${communityId}';`,
        (err, result, fields) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result);
        }
      );
    });

    if (queryResult[0].user_count > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return -1;
  }
};

module.exports = {
  readUserCommunity,
  readCommunityByJoinCode,
  allCommunities,
  verifyUserCommunity,
  readCommunity,
  validateCommunity,
  createCommunity,
  joinCommunity,
  updateMemberCount,
};
