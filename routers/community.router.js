const express = require("express");
const {readUserCommunityController ,allCommunityController, readCommunityController, createCommunityController, joinCommunityController } = require("./../controllers/community.controller");
const communityRouter = express.Router();

// @route Post /api/community/list
// @desc List all communities of a given user ID - body : uID
// @access Users registered in the community - middleware to be included
communityRouter.post("/list", allCommunityController);

// @route Post /api/community/read
// @desc read a community given community ID - body : communityId
// @access Users registered in the community - middleware to be included
communityRouter.post("/read", readCommunityController );

// @route Post /api/community/create
// @desc create a community
// @access Users
communityRouter.post("/create", createCommunityController);

// @route Post /api/community/joincommunity
// @desc join a community given user ID ,community ID, role - body : joinCode, userId, role
// @access Users
communityRouter.post("/joincommunity", joinCommunityController);

// @route Post /api/community/readUserCommunity
// @desc get all users of particular community - body : communityId
// @access admin / creator of the community
communityRouter.post("/readUserCommunity", readUserCommunityController);

module.exports = communityRouter;
