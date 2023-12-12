const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recordDate: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    enum: ["Happy", "Sad", "Calm", "Stressed", "Excited", "Other"],
  },
  tags: {
    type: [String],
  },
});

module.exports = mongoose.model("Record", recordSchema);
