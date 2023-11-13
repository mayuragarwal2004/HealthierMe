const Group = require("./group.model");

const readGroup = async(cId) =>{
  let groupCObj = await Group.findOne({ "cId": cId }).catch((err) => {
    console.log(err);
    return -1;
  })

  return groupCObj.group
}


const validateGroup = async (gItem) => {
  if (
    !gItem.gId ||
    !gItem.numOpts ||
    !gItem.minToComp ||
    gItem.minToComp > gItem.numOpts
  ) {
    return false;
  }

  if (
    await Group.findOne({ "group.gId": gItem.gId }).catch((err) => {
      console.log(err);
      return false;
    })
  ) {
    return false;
  }
  return true;
};

const createCGroup = async (cId, groupArr) => {
  const createCGroupMain = await Group.create({
    cId: cId,
    group: groupArr,
  }).catch((err) => {
    console.log(err);
    return -1;
  });

  return createCGroupMain;
};

module.exports = { createCGroup, validateGroup, readGroup };
