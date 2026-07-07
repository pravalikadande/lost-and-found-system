const express = require("express");
const router = express.Router();

const {
  addFoundItem,
  getFoundItems,
  getMyFoundItems,
  updateFoundItem,
  deleteFoundItem,
} = require("../controllers/foundController");

const protect = require("../middleware/authMiddleware");

// Add Found Item
router.post("/", protect, addFoundItem);

// Get All Found Items
router.get("/", getFoundItems);
// Update Found Item
router.put("/:id", protect, updateFoundItem);

// Delete Found Item
router.delete("/:id", protect, deleteFoundItem);

// Get My Found Items
router.get("/my-items", protect, getMyFoundItems);

module.exports = router;