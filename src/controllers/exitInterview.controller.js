const { ExitInterview } = require("../models");
const catchAsync = require("../utils/catchAsync");

const submitExitInterview = catchAsync(async (req, res) => {
  const { responses } = req.body;
  const employeeId = req.user.id;

  const exitInterview = await ExitInterview.create({ employeeId, responses });
  res.status(200).json({ data: exitInterview });
});

const getAllExitInterviews = catchAsync(async (req, res) => {
  const interviews = await ExitInterview.find().populate(
    "employeeId",
    "username"
  );
  res.status(200).json({ data: interviews });
});

module.exports = { submitExitInterview, getAllExitInterviews };
