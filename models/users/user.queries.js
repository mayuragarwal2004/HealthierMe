const User = require("./user.model");

const readUser = async (uId) => {
  let userObj = await User.findOne({ uId: uId }).catch((err) => {
    console.log(err);
    return -1;
  });

  return userObj;
};

const checkMId = async(uId, mId)=>{
  let {mIds} = await User.findOne({ uId: uId }).catch((err) => {
    console.log(err);
    return -1; //501
  })
  if(mIds.indexOf(mId) == -1){
    return -2
  }
  return True
  ;
}

const validateUser = async (uItem) => {
  if (
    !uItem.uId ||
    !uItem.name||
    !uItem.phone ||
    !uItem.email ||
    !uItem.dob ||
    !uItem.address ||
    !uItem.address.city ||
    !uItem.address.state ||
    !uItem.address.area
  ) {
    return 0;
  }

  if (
    await User.findOne({
      $or: [{ uId: uItem.uI }, { email: uItem.email }, { phone: uItem.phone }]
    }).catch((err) => {
      console.log(err);
      return -1;
    })
  ) {
    return -2;
  }
  return 1;
};

const createUser = async (uItem) => {
  const createUser = await User.create(uItem).catch((err) => {
    console.log(err);
    return -1;
  });

  return createUser;
};

// module.exports = { createUser, getMId, validateUser, readUser };
module.exports = { createUser, validateUser, readUser };
