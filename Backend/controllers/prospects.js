const Prospect = require("../models/Prospect");
// Create prospect

const createProspect = async (req, res) => {
    try {
      const newProspect = Prospect(req.body);
      const prospect = await newProspect.save();
      res.status(201).json(prospect);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// Get all prospects
const getAllProspects = async (req, res) => {
    try {
      const prospects = await Prospect.find().sort({ createdAt: -1 });
      res.status(200).json(prospects);
    } catch (error) {
      res.status(500).json(error);
    }
  };


  // Get one prospect

const getOneProspect = async (req, res) => {
    try {
      const prospect = await Prospect.findById(req.params.id);
      res.status(200).json(prospect);
    } catch (error) {
      res.status(500).json(error);
    }
  };


  // Delete a prospect

const deleteProspect = async (req, res) => {
    try {
      await Prospect.findByIdAndDelete(req.params.id);
      res.status(201).json("Prospect has been deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  };

// Add this new controller function
const checkDuplicate = async (req, res) => {
  try {
    const { email, tel, name } = req.query;
    
    const existingProspect = await Prospect.findOne({
      $or: [
        { email: email },
        { tel: tel },
        { name: name }
      ]
    });

    return res.status(200).json({
      exists: !!existingProspect,
      message: existingProspect ? 'Duplicate entry found' : 'No duplicate found'
    });
  } catch (error) {
    return res.status(500).json({
      exists: false,
      message: error.message || 'Error checking for duplicates'
    });
  }
};

module.exports = {
  deleteProspect,
  getOneProspect,
  getAllProspects,
  createProspect,
  checkDuplicate
};
  