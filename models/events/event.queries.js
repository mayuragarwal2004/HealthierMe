const Event = require("./event.model")

const readEvent = async(cId) =>{
    let eventCObj = await Event.findOne({ "cId": cId }).catch((err) => {
      console.log(err);
      return -1;
    })
  
    return eventCObj.event
  }

const validateEvent = async(eItem) =>{
    if(!eItem.eId || !eItem.eName || !eItem.eDesc || !eItem.eFreq || !eItem.eStart || !eItem.eEnd){
        return false
    }

    if(await Event.findOne({"event.eId": eItem.eId }).catch((err) => {
        console.log(err);
        return false;
      })){
        return false
    }
    return true

}

const createCEvent = async(cId, eventArr)=>{
    const createCEventMain = await Event.create({
        cId : cId,
        event : eventArr
    }).catch((err) => {
        console.log(err);
        return -1;
      });

    return createCEventMain
    

}

module.exports = {createCEvent, validateEvent, readEvent}