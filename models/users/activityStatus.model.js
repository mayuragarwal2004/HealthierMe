const mongoose = require("mongoose");
const { Schema } = mongoose;

const activityStatusSchema = new Schema({
  uId: { type: String, required: true, unique: true },
  user : [{
    cId : {
        type: String,
        required: true,
      },
    chlg:[{
        actId : {
            type: String,
            required: true,
            unique : true
          },
          act : [
            {
                date : {
                    type: String,
                    required: true,
                  },
                ts : {
                    type: String,
                    required: true,
                  },
                quant : {
                    type: Number,
                    required: true,
                  }

            }
          ]
    } ]}]
});

const ActivityStatus = mongoose.model("ActivityStatus", activityStatusSchema);

module.exports = ActivityStatus;
