const ActivityStatus = require("./activityStatus.model");
const User = require("./user.model")


const readActivity = async (uid) => {
  let userObj = await User.findOne({ uId: uid }).catch((err) => {
    console.log(err);
    return -1;
  });

  return userObj;
};

const validateActStatus = async (aItem) => {
  if (
    !aItem.uId ||
    !aItem.mId ||
    !aItem.sId ||
    !aItem.cId ||
    !aItem.actId ||
    !aItem.date ||
    !aItem.ts ||
    !aItem.quant
  ) {
    return 0;
  }

};

const updateActivity = async (uItem) => {

  const updatedActivity = await ActivityStatus.create(uItem).catch((err) => {
    console.log(err);
    return -1;
  });

  return updateActivity;
};

module.exports = { updateActivity, readActivity, validateActStatus };
