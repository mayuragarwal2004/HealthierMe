const User = require("./user.model");
const con = require("../../connection.sql");
var mysql = require("mysql");

async function validateEmail (email) {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  
  if (!email.match(validRegex)) {
    return false;
  }

  queryResult = await new Promise((resolve, reject)=>{
    con.query(
      `SELECT * FROM HealthierMe.User WHERE email = '${email}';`,
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

  if (queryResult[0]) {
    return false;
  }
  
  return true

}

const readUserByPhone = async (phone) => {
  queryResult = await new Promise((resolve, reject)=>{
    con.query(
      `SELECT * FROM HealthierMe.User WHERE phone= '${phone}';`,
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

const readUserByUId = async (uid) => {
  queryResult = await new Promise((resolve, reject)=>{
    con.query(
      `SELECT * FROM HealthierMe.User WHERE user_id='${uid}'; `,
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

// const checkMId = async (uid, mId) => {
//   let { mIds } = await User.findOne({ uid: uid }).catch((err) => {
//     console.log(err);
//     return -1; //501
//   });
//   if (mIds.indexOf(mId) == -1) {
//     return -2;
//   }
//   return True;
// };

const existUser = async (uItem) => {
  if (!uItem.phone) {
    return 0;
  }

  try {
    const queryResult = await new Promise((resolve, reject) => {
      con.query(
        "SELECT count(*) FROM HealthierMe.user WHERE phone=" + uItem.phone,
        (err, result, fields) => {
          if (err) {
            reject(err);
            return;
          }
          
          const userExists = result[0]["count(*)"] > 0;
          resolve(userExists ? 1 : 2);
        }
      );
    });

    return queryResult;
  } catch (err) {
    console.log(err);
    return -2;
  }
};

// const existUser = async (uItem) => {
//   if (!uItem.phone) {
//     return 0;
//   }
//   let rValue;

//   try {
//     const q = await con.query(
//       "SELECT count(*) FROM user WHERE phone=" + uItem.phone,
//       async (err, result, fields) => {
//         if (err) throw err;
//         console.log(await result[0]["count(*)"] == 0);

//         if (await result[0]["count(*)"] == 0) {
//           console.log("returned 2");
//           rValue = 2; // user does not exist
//         } else {
//           rValue = 1; // user exist
//         }
//       }
//     );
//     console.log({q: q})
//     return rValue;
//   } catch (err) {
//     console.log(err);
//     return -2;
//   }
//   // return -2;
// };

const validateUser = async (uItem) => {
  if (
    !uItem.uid ||
    !uItem.firstName ||
    !uItem.lastName ||
    !uItem.phone ||
    !uItem.dob ||
    !uItem.gender ||
    !uItem.address.pincode ||
    !uItem.address.locality ||
    !uItem.address.city ||
    !uItem.address.state ||
    !(uItem.phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) && uItem.phone[0] == '+') ||
    !(uItem.gender == 'Male' || uItem.gender == 'Female' || uItem.gender == 'Other' )
  ) {
    return 0;
  }
  if (uItem.email && !await validateEmail(uItem.email)) {
    return 0;
  }
  let existUser = await readUserByPhone(uItem.phone)
  let existUser2 = await readUserByUId(uItem.uid)
  if (existUser == -1 || existUser2 == -1) {
    return -1;
  } 
  else if (existUser || existUser2) {
  return -2;
}

  return 1;
}

const createUser = async (uItem) => {
  const {uid, firstName, lastName, middleName, email, phone, dob, gender, address, height, weight } = uItem
  let sql_middle_name = (middleName)? ", middle_name" : ""
  let main_middle_name = (middleName)? `, '${middleName}' ` : ""
  let sql_email = (email)? ", email" : ""
  let main_email = (email)? `, '${email}' ` : ""
  let sql_height = (height)? ", height" : ""
  let main_height = (height)? `, ${height} ` : ""
  let sql_weight = (weight)? ", weight" : ""
  let main_weight = (weight)? `, ${weight} ` : ""
  queryResult = await new Promise((resolve, reject)=>{
    con.query(
      `INSERT INTO HealthierMe.User
      (user_id, first_name, last_name ${sql_middle_name} ${sql_email}, phone, dob, gender, locality, pincode, city, state ${sql_height} ${sql_weight}) 
      VALUES 
      ('${uid}', '${firstName}', '${lastName}' ${main_middle_name} ${main_email}  ,'${phone}', '${dob}', '${gender}', '${address.locality}', '${address.pincode}', '${address.city}' , '${address.state}' ${main_height} ${main_weight});
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
  return uItem;
};

// module.exports = { createUser, getMId, validateUser, readUser };
module.exports = { createUser, validateUser, readUserByPhone, readUserByUId, existUser };
