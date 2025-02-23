const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const resignationRoutes = require("./admin.routes");

const router = express.Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
  
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", resignationRoutes);

module.exports = router;