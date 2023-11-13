const express = require("express");
const app = express();
const challengeRouter = require("./routers/challenge.router");
const seasonRouter = require("./routers/season.router");
const userRouter = require("./routers/user.router");
const activityRouter = require("./routers/activity.router");
const testRouter = require("./routers/test.router");
// const connectToMongoose = require('./connection')
const con = require("./connection.sql");
const cors = require("cors");
const communityRouter = require("./routers/community.router");

app.use(express.json());

app.use(cors());

// connectToMongoose();
// connectToSQL();

// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Result: " + result);
// });

app.get("/", (req, res) => {
  res.status(200).send("Hello World! Express\n");
});

app.use("/api/test", testRouter);
app.use("/api/user", userRouter);
app.use("/api/community", communityRouter);
app.use("/api/season", seasonRouter);
app.use("/api/challenge", challengeRouter);
app.use("/api/activity", activityRouter);

var ip = require("ip");
console.dir(ip.address());

app.listen(5001, () => console.log("listening"));

//work
//update desc sql field in all
//add userId validation especially for community
