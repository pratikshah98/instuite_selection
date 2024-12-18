const mongoose = require("mongoose");

const MediumSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Medium", MediumSchema);
