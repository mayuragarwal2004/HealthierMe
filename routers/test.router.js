const express = require('express')
const {testController} = require('./../controllers/test.controller')
const userRouter = express.Router();

// @route Post /api/test/sql
// @desc Testing My SQL Connection
// @access Everyone
userRouter.get('/sql', testController)

module.exports = userRouter