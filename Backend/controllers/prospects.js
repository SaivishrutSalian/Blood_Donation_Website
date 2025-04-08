const Prospect = require("../models/Prospect");

// Create prospect
const createProspect = async (req, res) => {
    try {
        const newProspect = new Prospect(req.body);
        const savedProspect = await newProspect.save();
        res.status(201).json(savedProspect);
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

// Delete prospect
const deleteProspect = async (req, res) => {
    try {
        await Prospect.findByIdAndDelete(req.params.id);
        res.status(200).json("Prospect has been deleted successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};

// Check duplicate
const checkDuplicate = async (req, res) => {
    try {
        const { email, tel } = req.query;
        
        const existingProspect = await Prospect.findOne({
            $or: [
                { email: email },
                { tel: tel }
            ]
        });

        return res.status(200).json({
            exists: !!existingProspect,
            message: existingProspect ? 'Duplicate prospect found' : 'No duplicate found'
        });
    } catch (error) {
        return res.status(500).json({
            exists: false,
            message: error.message || 'Error checking for duplicates'
        });
    }
};

module.exports = {
    createProspect,
    getAllProspects,
    getOneProspect,
    deleteProspect,
    checkDuplicate
};
  