const {
  listChallenges,
} = require("../models/challenges/challenge.queries.sql");
const { listTasks } = require("../models/tasks/task.queries.sql");
const { listEvents } = require("../models/events/event.queries.sql");
const { listGroups } = require("../models/groups/group.queries.sql");

const createChallengeController = (req, res) => {
  console.log(req.body);
  res.send(req.body);
};

const listChallengeController = async (req, res) => {
  const { seasonId } = req.body;

  if (!seasonId) {
    return res.status(400).send("Insufficient inputs");
  }
  const challengelist = await listChallenges(seasonId);
  if (challengelist == -1) {
    return res.status(500).send("Error fetching challenge list");
  }
  // else if (challengelist == -2) {
  //   return res.status(403).send("No permission to view the data");
  // }
  if (!challengelist) {
    return res.status(404).send("Challenge List not found");
  }

  return res.status(200).send(challengelist);
};

const listTasksEventsGroupsController = async (req, res) => {
  const { challengeId } = req.body;
  
  challengeArr = [];
  challengeObj = { event: [], task: [], group: [] };

  if (!challengeId) {
    return res.status(400).send("Insufficient inputs");
  }

  // 1. Get all tasks
  const taskArr = await listTasks(challengeId);
  if (taskArr == -1) {
    return res.status(500).send("Error fetching task list");
  }
  // else if (taskArr == -2) {
  //   return res.status(403).send("No permission to view the data");
  // }

  // 2. Get all events
  const eventArr = await listEvents(challengeId);
  if (eventArr == -1) {
    return res.status(500).send("Error fetching event list");
  }
  // else if (eventArr == -2) {
  //   return res.status(403).send("No permission to view the data");
  // }

  // 3. Get all groups
  const groupArr = await listGroups(challengeId);
  if (groupArr == -1) {
    return res.status(500).send("Error fetching group list");
  }
  // else if (groupArr == -2) {
  //   return res.status(403).send("No permission to view the data");
  // }

  // 4. Arrange all the data into an array
  challengeObj["task"] = taskArr;
  challengeObj["event"] = eventArr;
  challengeObj["group"] = groupArr;

  return res.status(200).send(challengeObj);
};

module.exports = {
  createChallengeController,
  listChallengeController,
  listTasksEventsGroupsController,
};
