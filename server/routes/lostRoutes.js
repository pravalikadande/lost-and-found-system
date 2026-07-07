const express = require("express");
const router = express.Router();

const {
  addLostItem,
  getLostItems,
  getMyLostItems,
  updateLostItem,
  deleteLostItem,
} = require("../controllers/lostController");

const protect = require("../middleware/authMiddleware");


// Add Lost Item
router.post("/", protect, addLostItem);

// Get All Lost Items
router.get("/", getLostItems);

router.get("/my-items", protect, getMyLostItems);

router.put("/:id", updateLostItem);

router.delete("/:id", deleteLostItem);
router.get("/test", (req, res) => {
  res.send("Lost Route Working");
});
module.exports = router;