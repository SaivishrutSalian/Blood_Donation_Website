const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOneOrder,
  deleteOrder,
  updateOrder,
  checkDuplicate
} = require("../controllers/orders");

// ADD ORDER
router.post("/", createOrder);

// GET ALL ORDERS
router.get("/", getAllOrders);

// GET ONE ORDER
router.get("/find/:id", getOneOrder);

// UPDATE ORDER
router.put("/:id", updateOrder);

// DELETE ORDER
router.delete("/:id", deleteOrder);

// Check-duplicate route
router.get("/check-duplicate", checkDuplicate);

module.exports = router;