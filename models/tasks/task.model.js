const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
    {
      tId: {
        type: String, // "t1687186312943"
        required: true,
        unique: true,
      },

      tName: {
        type: String, // 'walking'
        required: true,
      },
      tDesc: {
        type: String, //'walk 3000 unit steps daily for 21 days',
        required: true,
      },
      tQuant: {
        type: Number,
        required: true,
      },
      tUnit: {
        type: String,
        required: true,
      },
      tPeriodUnit: {
        type: String,
        required: true,
      },
      tTC: {
        type: Number,
        required: true,
      },
      tStart: {
        type: String,
        required: true,
      },
      tEnd: {
        type: String,
        required: true,
      },
      gId: {
        type: String,
      },
});


const taskCSchema = new Schema({
    cId: {
      type: String, // "t1687186312943"
      required: true,
      unique: true,
    },
    task: [taskSchema]
  });

const Task = mongoose.model("Task", taskCSchema);

module.exports = Task;
