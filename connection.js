const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const mongoURI = process.env.CONNECTION_STRING;
mongoose.set("strictQuery", false);

const connectToMongoose =  () => {
  try {
    mongoose.connect(mongoURI);
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error connecting to MongoDB", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToMongoose;