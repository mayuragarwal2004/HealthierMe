const {readGroupByCid, readGroupByGid, validateGroup, createCGroup} = require('./group.queries.sql.js');

const readGroupbyGidController = async (req, res) => {
    const {gId} = req.body;
    if(!gId){
        return res.status(400).send("Insufficient inputs");
    }
    const groupObj = await readGroupByGid(gId);
    if(groupObj == -1){
        return res.status(500).send("Error fetching group");
    }
    if(!groupObj){
        return res.status(404).send("Group not found");
    }
    
    return res.status(200).send(groupObj);
}

const readGroupByCidController = async (req, res) => {
    const {cId} = req.body;
    if(!cId){
        return res.status(400).send("Insufficient inputs");
    }
    const groupObj = await readGroupByCid(cId);
    if(groupObj == -1){
        return res.status(500).send("Error fetching group");
    }
    if(!groupObj){
        return res.status(404).send("Group not found");
    }
    
    return res.status(200).send(groupObj);
}

const createGroupController = async (req, res) => {
    const {cId, groupArr} = req.body;
    if(!cId || !groupArr){
        return res.status(400).send("Insufficient inputs");
    }

    //validate group
    const valid = await validateGroup(groupArr);
    if(!valid){
        return res.status(400).send("Invalid group");
    }
    if(valid == -1){
        return res.status(500).send("Error validating group");
    }

    const groupObj = await createCGroup(cId, groupArr);
    if(groupObj == -1){
        return res.status(500).send("Error creating group");
    }
    if(!groupObj){
        return res.status(404).send("Group not created");
    }
    
    return res.status(200).send(groupObj);
}

module.exports = {readGroupByCidController, readGroupbyGidController, createGroupController}