const express = require("express");
const { auth, authorize } = require("../middlewares/auth.middleware.js");
const { resignationController, exitInterviewController } = require("../controllers");

const router = express.Router();

router.post("/resign", auth, authorize("Employee"), resignationController.submitResignation);
router.post("/responses", auth, authorize("Employee"), exitInterviewController.submitExitInterview);

module.exports = router;
