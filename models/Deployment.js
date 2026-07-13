const mongoose = require("mongoose");

const deploymentSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  url: { type: String, required: true },
  status: { type: String, enum: ["pending", "building", "success", "failed"], default: "pending" },
  logs: [{ message: String, timestamp: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Deployment", deploymentSchema);
