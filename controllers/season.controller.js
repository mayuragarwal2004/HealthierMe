const {
  createCTask,
  validateTask,
  readTaskByCid,
  readTaskByTid
} = require("../models/tasks/task.queries.sql");
const {
  createCEvent,
  validateEvent,
  readEventByCid,
  readEventByEid
} = require("../models/events/event.queries.sql");
const {
  createCGroup,
  validateGroup,
  readGroupByCid,
  readGroupByGid
} = require("../models/groups/group.queries.sql");
const {
  validateChallenge,
  createChallenge,
  readChallenge,
} = require("../models/challenges/challenge.queries.sql");
const {
  validateSeason,
  createSeason,
  readSeason,
  listSeasons,
} = require("../models/seasons/season.queries.sql");

//not updates wrt sql
const readSeasonController = async (req, res) => {
  //get season object
  let seasonObj = await readSeason(req.body.sId);

  if (seasonObj == -1) {
    return res.status(400).send("Error getting season data");
  }
  if (!seasonObj) {
    return res.status(404).send("Season data not found");
  }

  seasonObj.challenge = [];

  //iterate over challenge ids
  let { challengeIds } = seasonObj;
  for (i in challengeIds) {
    let challengeObj = await readChallenge(challengeIds[i]);
    if (challengeObj == -1) {
      return res.status(400).send("Error getting challenges");
    }
    if (!challengeObj) {
      return res.status(404).send("Challenge data not found");
    }
    // challengeObj = challengeObj.toObject()

    let { cId } = challengeObj;

    //for every challenge id, get tasks, events, groups
    let groupArr = await readGroupByCid(cId);
    if (groupArr == -1) {
      return res.status(400).send("Error getting Groups");
    }
    let eventArr = await readEventByCid(cId);
    if (eventArr == -1) {
      return res.status(400).send("Error getting Events");
    }
    let taskArr = await readTaskByCid(cId);
    if (taskArr == -1) {
      return res.status(400).send("Error getting Tasks");
    }

    challengeObj.group = [...groupArr];
    challengeObj.event = [...eventArr];
    challengeObj.task = [...taskArr];

    // append challenge object in season object
    seasonObj.challenge.push(challengeObj);
  }

  return res.status(200).send(seasonObj);
};

const createSeasonController = async (req, res) => {
  let challengeIds = []; //for adding into seasons object
  const challengeArr = req.body.challenge;
  const seasonObj = req.body.season;
  userId = seasonObj.userId;
  // console.log(challengeArr)

  if (!seasonObj || !(await validateSeason(seasonObj))) {
    return res.status(400).send("Season validation failed");
  }

  if (!challengeArr) {
    return res.status(400).send("No Challenges entered");
  }

  //checking whole challenge array
  for (i in challengeArr) {
    let { cId, cName, cDesc, cStart, cEnd, active, desc} = challengeArr[i];
    let cObj = { cId, cName, cDesc, cStart, cEnd, active, userId, desc};
    let taskArr = challengeArr[i].task;
    let eventArr = challengeArr[i].event;
    let groupArr = challengeArr[i].group;

    if (!(await validateChallenge(cObj))) {
      return res.status(400).send(`Challenge ${i + 1} Invalid`);
    }
    challengeIds.push(cId);

    // --------------- Task Validation -----------------------

    for (j in taskArr) {
      let tItem = taskArr[j];
      // console.log(tItem)
      if (!(await validateTask(tItem))) {
        return res.status(400).send("Task Items Invalid / Not unique");
      }
    }

    // --------------- Event Validation -----------------------
    for (j in eventArr) {
      let eItem = eventArr[j];
      // console.log(eItem)
      if (!(await validateEvent(eItem))) {
        return res.status(400).send("Event Items Invalid / Not unique");
      }
    }

    // --------------- Group Validation ---------------------
    for (j in groupArr) {
      let gItem = groupArr[j];
      // console.log(gItem)
      if (!(await validateGroup(gItem))) {
        return res.status(400).send("Group Items Invalid / Not unique");
      }
    }
  }

  //enter data into sql
  for (i in challengeArr) {
    let { cId, cName, cDesc, cStart, cEnd, active, desc } = challengeArr[i];
    let cObj = { cId, cName, cDesc, cStart, cEnd, active, userId, desc };
    let taskArr = challengeArr[i].task;
    let eventArr = challengeArr[i].event;
    let groupArr = challengeArr[i].group;
    let sObj = { ...seasonObj};

    if ((await createSeason(sObj)) == -1) {
      return res.status(400).send("Error creating Season");
    }

    if ((await createChallenge(seasonObj.sId, cObj)) == -1) {
      return res.status(400).send("Error creating Challenge");
    }

    if ((await createCGroup(cId, groupArr)) == -1) {
      return res.status(400).send("Error creating Group");
    }

    if ((await createCTask(cId, taskArr)) == -1) {
      return res.status(400).send("Error creating task");
    }

    if ((await createCEvent(cId, eventArr)) == -1) {
      return res.status(400).send("Error creating Event");
    }

    
  }
  return res.status(200).send("Form submitted successfully");
};

const listSeasonController = async (req, res) => {
  const { uID, communityId } = req.body;

  if (!uID || !communityId) {
    return res.status(400).send("Insufficient inputs");
  }
  const seasonlist = await listSeasons( communityId);
  if (seasonlist == -1) {
    return res.status(500).send("Error fetching season list");
  } 
  // else if (seasonlist == -2) {
  //   return res.status(403).send("No permission to view the data");
  // }
  if (!seasonlist) {
    return res.status(404).send("Season List not found");
  }

  return res.status(200).send(seasonlist);
};

module.exports = {
  createSeasonController,
  readSeasonController,
  listSeasonController,
};
