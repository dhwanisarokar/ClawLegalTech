const mongoose = require("mongoose");

const ExitInterviewSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  responses: [{ questionText: String, response: String }],
});

module.exports = mongoose.model("ExitInterview", ExitInterviewSchema);
