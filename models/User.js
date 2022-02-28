const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Wrapping up the userSchema as "User" and exporting it to use in other modules.
module.exports = mongoose.model("User", userSchema);
