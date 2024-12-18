const mongoose = require("mongoose");

const StandardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "ClassCategory", required: true },
});

module.exports = mongoose.model("Standard", StandardSchema);
