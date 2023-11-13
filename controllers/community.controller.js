const con = require("../connection.sql");
const { allCommunities, verifyUserCommunity, readCommunityByJoinCode, readCommunity, validateCommunity, createCommunity, joinCommunity, updateMemberCount, readUserCommunity } = require("../models/community/community.queries.sql");

createJoinCode = async() => {
  let joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  //check if join code already exists in community
  const commObj = await readCommunityByJoinCode(joinCode);
  if (commObj == -1) {
    return -1;
  }
  if (commObj) {
    return createJoinCode();
  }
  return joinCode;
}

const readUserCommunityController = async(req, res) => {
  const { communityId } = req.body;
  if (!communityId) {
    return res.status(400).send("Insufficient inputs");
  }
  const userCommunity = await readUserCommunity(communityId);
  if (userCommunity == -1) {
    return res.status(500).send("Error fetching user community");
  }
  if (!userCommunity) {
    return res.status(404).send("User community not found");
  }

  return res.status(200).send(userCommunity);
  
}

const allCommunityController = async (req, res) => {
  const { uID } = req.body;
  if (!uID) {
    return res.status(400).send("Insufficient inputs");
  }
  const communitylist = await allCommunities(uID);
  if (communitylist == -1) {
    return res.status(500).send("Error fetching community list");
  }
  if (!communitylist) {
    return res.status(404).send("Community List not found");
  }

  return res.status(200).send(communitylist);
};

const readCommunityController = async (req, res) => {
  const { communityId } = req.body;
  if (!communityId) {
    return res.status(400).send("Insufficient inputs");
  }
  const communityObj = await readCommunity(communityId);
  if (communityObj == -1) {
    return res.status(500).send("Error fetching community");
  }

  if (!communityObj) {
    return res.status(404).send("Community not found");
  }

  return res.status(200).send(communityObj);

}

const createCommunityController = async (req, res) => {
  let communityItem = req.body;
  let vC = await validateCommunity(communityItem);
  if (!communityItem || vC == 0) {
    return res.status(400).send("Insufficient / Incorrect inputs");
  }
  switch (vC) {
    case -1:
      return res.status(500).send("Error validating Community");
    case -2:
      return res.status(409).send("Community already Exists");
  }

  //create a 6 length aplhanumberic community join code
  const joinCode = await createJoinCode();
  if (joinCode == -1) {
    return res.status(500).send("Error creating join code");
  }
  communityItem.joinCode = joinCode;


  let communityObj = await createCommunity(communityItem);
  if (communityObj == -1) {
    return res.status(500).send("Error creating Community");
  }
  
  const joinCommunityObj = await joinCommunity(communityObj.communityId, communityItem.userId, "Creator");
  if (joinCommunityObj == -1) {
    return res.status(500).send("Error joining community");
  }

  return res.status(200).send(communityObj);
}

const joinCommunityController = async (req, res) => {
  const { joinCode, userId, role } = req.body;
  if (!joinCode || !userId || !role) {
    return res.status(400).send("Insufficient inputs");
  }

  //get community id from join code
  const commObj = await readCommunityByJoinCode(joinCode);
  if (commObj == -1) {
    return res.status(500).send("Error fetching community");
  }
  if (!commObj) {
    return res.status(404).send("Community not found");
  }
  const communityId = commObj.community_id;

  //check if user-community mapping already exists
  const userCommunity = await verifyUserCommunity(userId, communityId);
  if (userCommunity == -1) {
    return res.status(500).send("Error verifying user community");
  }
  if (userCommunity) {
    return res.status(409).send("User already in community");
  }

  //join community
  const joinCommunityObj = await joinCommunity(communityId, userId, role);
  if (joinCommunityObj == -1) {
    return res.status(500).send("Error joining community");
  }

  //update member count
  const updateMemberCountObj = await updateMemberCount(communityId);
  if (updateMemberCountObj == -1) {
    return res.status(500).send("Error updating member count");
  }

  return res.status(200).send("User joined community successfully");
} 

module.exports = { readUserCommunityController ,allCommunityController, readCommunityController, createCommunityController, joinCommunityController};
