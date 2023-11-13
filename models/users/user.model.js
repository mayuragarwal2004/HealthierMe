const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  uId: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: String, required: true },
  address: {
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    mIds: [
      {
        type: String, required: true
      }
    ],
    ts : {type: String, required: true}
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
