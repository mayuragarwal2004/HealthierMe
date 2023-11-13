const con = require("../../connection.sql");
var mysql = require("mysql");

const testSQL = async () => {
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Test;`,
      function (err, result, fields) {
        if (err) {
          reject(err);
        } else resolve(result);
      }
    );
  }).catch((err) => {
    console.log(err);
    return err;
  });
  return queryResult;
};

// module.exports = { createUser, getMId, validateUser, readUser };
module.exports = { testSQL };
