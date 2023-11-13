const express = require('express')
const { listActivitiesController } = require('../controllers/activity.controller')
const challengeRouter = express.Router();

// @route Post /api/activity/list
// @desc List all challenges of a given season ID - body : uID, communityId, seasonId
// @access Users registered in the community - middleware to be included
challengeRouter.post('/list', listActivitiesController)

module.exports = challengeRouter