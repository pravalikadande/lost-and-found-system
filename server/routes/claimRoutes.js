const express = require("express");
const router = express.Router();

const {
  createClaim,
  getClaims,
  approveClaim,
  rejectClaim,
} = require("../controllers/claimController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createClaim);
router.get("/", protect, getClaims);
router.put("/approve/:id", protect, approveClaim);
router.put("/reject/:id", protect, rejectClaim);

module.exports = router;