const Lost = require("../models/Lost");

// Add Lost Item
const addLostItem = async (req, res) => {
  try {
    const lostItem = await Lost.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Lost Item Added Successfully",
      lostItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Lost Items (Only Lost Items)
// Get All Lost Items
const getLostItems = async (req, res) => {
  try {
    const lostItems = await Lost.find()
      .populate("user", "name email");

    res.status(200).json(lostItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Lost Item
const updateLostItem = async (req, res) => {
  try {
    console.log("=== UPDATE ITEM ===");
    console.log("REQ.USER:", req.user);
    console.log("REQ.BODY:", req.body);
    console.log("REQ.PARAMS:", req.params);

    const item = await Lost.findById(req.params.id);

    console.log("ITEM:", item);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only the item owner can update this item",
      });
    }

    if (req.body.status) {
      item.status = req.body.status;
    }

    await item.save();

    res.status(200).json({
      message: "Item Updated Successfully",
      item,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Lost Items
const getMyLostItems = async (req, res) => {
  try {
    const lostItems = await Lost.find({
      user: req.user.id,
    });

    res.status(200).json(lostItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteLostItem = async (req, res) => {
  try {
    const item = await Lost.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only the item owner can delete this item",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      message: "Lost Item Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addLostItem,
  getLostItems,
  updateLostItem,
  deleteLostItem,
  getMyLostItems,
};