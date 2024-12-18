const mongoose = require("mongoose");

const InstituteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["Playhouse", "School", "College", "Competitive Exam Center"] },
});

module.exports = mongoose.model("Institute", InstituteSchema);
