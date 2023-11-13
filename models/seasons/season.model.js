const mongoose = require("mongoose");
const { Schema } = mongoose;

const seasonSchema = new Schema(
    {
      sId: {
        type: String, 
        required: true,
        unique: true,
      },

      sName: {
        type: String, 
        required: true,
      },
      sStart: {
        type: String,
        required: true,
      },
      sEnd: {
        type: String,
        required: true,
      },
      challengeNo: {
        type: Number,
        required: true,
      },
      challengeIds: [{
        type: String,
      }],
});


const Season = mongoose.model("Season", seasonSchema);

module.exports = Season;
