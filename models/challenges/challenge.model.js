const mongoose = require("mongoose");
const { Schema } = mongoose;

const challengeSchema = new Schema(
    {
      cId: {
        type: String, 
        required: true,
        unique: true,
      },
      cName: {
        type: String, 
        required: true,
      },
      cDesc: {
        type: String, 
        required: true,
      },
      cStart: {
        type: String,
        required: true,
      },
      cEnd: {
        type: String,
        required: true,
      },
});


const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
