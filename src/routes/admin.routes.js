const express = require("express");
const {auth, authorize}= require("../middlewares/auth.middleware");
const { resignationController, exitInterviewController } = require("../controllers");

const router = express.Router();

router.get("/resignations", auth, authorize("HR"), resignationController.getAllResignations);
router.put("/conclude_resignation", auth, authorize("HR"), resignationController.concludeResignation);
router.get("/exit_responses", auth, authorize("HR"), exitInterviewController.getAllExitInterviews);

module.exports = router;
