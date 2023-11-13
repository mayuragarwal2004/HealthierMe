const Task = require("./task.model");

const readTask = async(cId) =>{
  let taskCObj = await Task.findOne({ "cId": cId }).catch((err) => {
    console.log(err);
    return -1;
  })

  return taskCObj.task
}

const validateTask = async(tItem) =>{
    if(!tItem.tId || !tItem.tName || !tItem.tDesc || !tItem.tQuant || !tItem.tUnit || !tItem.tPeriodUnit || !tItem.tTC || !tItem.tStart || !tItem.tEnd){
        return false
    }

    if(await Task.findOne({"task.tId": tItem.tId }).catch((err) => {
      console.log(err);
      return false;
    })
  ){
        return false
    }
    return true

}

const createCTask = async (cId, taskArr) => {

  const createCTaskMain = await Task.create({
    cId: cId,
    task: taskArr,
  }).catch((err) => {
    console.log(err);
    return -1;
  });

  return createCTaskMain;

};

module.exports = { createCTask, validateTask, readTask };
