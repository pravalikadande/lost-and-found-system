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

// Get All Lost Items
const getLostItems = async (req, res) => {
  try {
    const lostItems = await Lost.find({
      status: "Lost",
    }).populate("user", "name email");

    res.status(200).json(lostItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const updateLostItem = async (req, res) => {
  try {
    const item = await Lost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLostItem = async (req, res) => {
  try {
    await Lost.findByIdAndDelete(req.params.id);

    res.json({
      message: "Lost Item Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMyLostItems = async (req, res) => {
  try {
    const lostItems = await Lost.find({ user: req.user.id });

    res.status(200).json(lostItems);
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