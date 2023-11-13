const Challenge = require("./challenge.model")
const Event = require("../events/event.model")
const Task = require("../tasks/task.model")
const Group = require("../groups/group.model")

const readChallenge = async(cId) =>{
    const challengeObj  = await Challenge.findOne({"cId" : cId}).catch((err) => {
        console.log(err);
        return -1;
      });

      if(challengeObj != null){
        return challengeObj.toObject()
      }
      
      return challengeObj

}


const validateChallenge = async(cObj) =>{
    if(!cObj.cId || !cObj.cName || !cObj.cDesc || !cObj.cStart || !cObj.cEnd){
        return false
    }        
    try{
    if (await Challenge.findOne({"cId" : cObj.cId}) || await Task.findOne({"cId" : cObj.cId}) || await Event.findOne({"cId" : cObj.cId}) || await Group.findOne({"cId" : cObj.cId}))
    {
        return false
    }
}catch(err){
    console.log(err);
    return false;}


    return true
}

const createChallenge = async(cObj)=>{
    const createChallengeMain = await Challenge.create(cObj).catch((err) => {
        console.log(err);
        return -1;
      });

    return createChallengeMain
    

}

module.exports = {validateChallenge, createChallenge, readChallenge }