const {
  updateActivity,
  readActivity,
  validateActStatus,
} = require("../models/users/activityStatus.queries");
const { getMId } = require("../models/users/user.queries");

const activityReadController = async (req, res) => {
  let { uId } = req.body;
  if (!uId) {
    return res.status(400).send("Insufficient inputs");
  }
  userObj = await readUser(uId);
  if (userObj == -1) {
    return res.status(500).send("Error fetching user");
  }
  if (!userObj) {
    return res.status(404).send("User not found");
  }
  return res.status(200).send(userObj);
};

const activityUpdateController = async (req, res) => {
  let aItem = req.body;
  // console.log(uItem)
  let aU = await validateActStatus(aItem);

  if (!aItem || aU == 0) {
    return res.status(400).send("Insufficient inputs");
  }
  // switch (aU){
  //     case -1 :  return res.status(500).send("Error validating User");
  //     case -2 :  return res.status(409).send("User already Exists");
  // }

  let ansMId = await checkMId(aItem.uId, aItem.mId);
  switch (aU) {
    case -1:
      return res.status(500).send("Error validating User");
    case -2:
      return res.status(409).send("User already Exists");
  }

  if (!mId || mId == -2) {
    return res.status(401).send("Community not found");
  }
  if (mId == -1) {
    return res.status(501).send("Internal Server Error");
  }

  let uObj = await createUser(uItem);
  if (uObj == -1) {
    return res.status(500).send("Error creating User");
  }
  return res.status(200).send("User created successfully");
};

const listActivitiesController = async () => {};

module.exports = {
  activityReadController,
  activityUpdateController,
  listActivitiesController,
};
