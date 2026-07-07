const Found = require("../models/Found");

// Add Found Item
const addFoundItem = async (req, res) => {
  try {
    const foundItem = await Found.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Found Item Added Successfully",
      foundItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Found Items
const getFoundItems = async (req, res) => {
  try {
    const foundItems = await Found.find({
  status: "Found",
}).populate("user", "name email");

    res.status(200).json(foundItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyFoundItems = async (req, res) => {
  try {
    const items = await Found.find({ user: req.user.id });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const updateFoundItem = async (req, res) => {
  try {
    const item = await Found.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFoundItem = async (req, res) => {
  try {
    await Found.findByIdAndDelete(req.params.id);

    res.json({
      message: "Found Item Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addFoundItem,
  getFoundItems,
  updateFoundItem,
  deleteFoundItem,
  getMyFoundItems,
};