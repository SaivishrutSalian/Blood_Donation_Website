const express = require("express");
const router = express.Router();
const {
   createProspect,
   getAllProspects,
   getOneProspect,
   deleteProspect,
   checkDuplicate,
  } = require("../controllers/prospects");

// ADD PROSPECT
router.post("/", createProspect);

// GET ALL PROSPECTS

router.get("/", getAllProspects);

// GET ONE PROSPECT

router.get("/find/:id", getOneProspect);

// DELETE PROSPECT

router.delete("/:id", deleteProspect);

router.get("/check-duplicate", checkDuplicate);

module.exports=router;