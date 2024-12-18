const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  standardId: { type: mongoose.Schema.Types.ObjectId, ref: "Standard", required: true },
});

module.exports = mongoose.model("Subject", SubjectSchema);
