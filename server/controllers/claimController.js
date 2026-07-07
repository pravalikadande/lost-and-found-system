const Claim = require("../models/Claim");
const Found = require("../models/Found");

// Create Claim
const createClaim = async (req, res) => {
  try {
    const { foundItem, message } = req.body;

    const claim = await Claim.create({
      foundItem,
      message,
      claimant: req.user.id,
    });

    res.status(201).json({
      message: "Claim Submitted Successfully",
      claim,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Claims
const getClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
  .populate({
    path: "claimant",
    select: "name email",
  })
  .populate({
    path: "foundItem",
    select: "title",
  });

    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Approve Claim
const approveClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    claim.status = "Approved";
    await claim.save();

    await Found.findByIdAndUpdate(claim.foundItem, {
      status: "Claimed",
    });

    res.json({
      message: "Claim Approved",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Reject Claim
const rejectClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    claim.status = "Rejected";
    await claim.save();

    res.json({
      message: "Claim Rejected",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createClaim,
  getClaims,
  approveClaim,
  rejectClaim,
};