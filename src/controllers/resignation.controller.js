const { Resignation, User } = require("../models");
const emailService = require("../utils/sendEmail");
const isHoliday = require("../config/calendarific");
const catchAsync = require("../utils/catchAsync");

const submitResignation = catchAsync(async (req, res) => {
  const { lwd } = req.body;
  const employeeId = req.user.id;

  // Check if LWD falls on a holiday
  const isHolidayOnLWD = await isHoliday(lwd);

  if (isHolidayOnLWD)
    return res
      .status(400)
      .json({ message: "LWD falls on a holiday. Choose another date." });

  const resignation = await Resignation.create({ employeeId, lwd });

  // Notify HR via email

  await emailService.sendEmail(
    "dhwanisarokar@gmail.com", //HR email
    "New Resignation Submitted",
    `Employee ${req.user.username} submitted a resignation.`
  );

  res.status(200).json({ data: { resignation } });
});

const concludeResignation = catchAsync(async (req, res) => {
  const { resignationId, approved, exitDate } = req.body;

  if (approved && !exitDate) {
    throw new ApiError(
      400,
      "Exit date is required when approving resignation."
    );
  }

  const resignation = await Resignation.findById(resignationId).populate(
    "employeeId"
  );
  if (!resignation) {
    throw new ApiError(404, "Resignation not found.");
  }

  if (resignation.status !== "pending") {
    throw new ApiError(400, "This resignation has already been processed.");
  }

  resignation.status = approved ? "approved" : "rejected";
  resignation.exitDate = approved ? exitDate : null;
  await resignation.save();

  // Send email notification
  const emailSubject = approved
    ? "Resignation Approved"
    : "Resignation Rejected";
  const emailBody = approved
    ? `Your resignation has been approved. Your last working day is set to ${exitDate}.`
    : "Your resignation request has been rejected.";
console.log(resignation.employeeId.email);

  await nodemailer.sendEmail(
    resignation.employeeId.email,
    emailSubject,
    emailBody
  );

  res.json({
    message: `Resignation ${approved ? "approved" : "rejected"} successfully.`,
  });
});

const getAllResignations = catchAsync(async (req, res) => {
  const resignations = await Resignation.find().populate(
    "employeeId",
    "username"
  );
  res.status(200).json({ data: resignations });
});

module.exports = { submitResignation, concludeResignation, getAllResignations };
