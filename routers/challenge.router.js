const express = require('express')
const {createChallengeController, listChallengeController, listTasksEventsGroupsController} = require('./../controllers/challenge.controller')
const challengeRouter = express.Router();

challengeRouter.post('/create', createChallengeController)

// @route Post /api/challenge/list
// @desc List all challenges of a given season ID - body : uID, communityId, seasonId
// @access Users registered in the community - middleware to be included
challengeRouter.post('/list', listChallengeController)

// @route Post /api/challenge/listTEG
// @desc List all Tasks, Events, Groups of a challenge ID - body : uID, communityId, seasonId, challengeId
// @access Users registered in the community - middleware to be included
challengeRouter.post('/listTEG', listTasksEventsGroupsController)

module.exports = challengeRouter