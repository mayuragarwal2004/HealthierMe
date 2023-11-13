const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema(
    {
      eId: {
        type: String, // "e1687186312943"
        required: true,
        unique: true,
      },

      eName: {
        type: String, 
        required: true,
      },
      eDesc: {
        type: String, 
        required: true,
      },
      eStart: {
        type: String,
        required: true,
      },
      eEnd: {
        type: String,
        required: true,
      },
      eFreq: {
        type: Number,
        required: true,
      },
      gId: {
        type: String,
      },
});


const eventCSchema = new Schema({
    cId: {
      type: String, // "t1687186312943"
      required: true,
      unique: true,
    },
    event: [eventSchema]
  });

const Event = mongoose.model("Event", eventCSchema);

module.exports = Event;
