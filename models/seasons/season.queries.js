const Season = require("./season.model");

const readSeason = async(sId) =>{
  let seasonObj = await Season.findOne({"sId" : sId}).catch((err) => {
    console.log(err);
    return -1;
  })
  // console.log(seasonObj)
  if(seasonObj != null){
    return seasonObj.toObject()
  }
  
  return seasonObj
}

const validateSeason = async(seasonObj) =>{
    if(!seasonObj.sId || !seasonObj.sName || !seasonObj.sStart || !seasonObj.sEnd || !seasonObj.challengeNo){
      return false
    }        

    if (await Season.findOne({"sId" : seasonObj.sId}).catch((err) => {
      console.log(err);
      return -1;
    }))
    {  
      return false
    }

    return true
}

const createSeason = async (sObj) => {
  const createSeasonMain = await Season.create(sObj).catch((err) => {
    console.log(err);
    return -1;
  });

  return createSeasonMain;
};

module.exports = { createSeason, validateSeason, readSeason };
