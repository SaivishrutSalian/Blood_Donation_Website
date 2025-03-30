const Order = require("../models/Order");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(req.body.tel)) {
      return res.status(400).json({ message: "Phone number must be exactly 10 digits." });
    }

    // Check for required fields
    if (!req.body.name || !req.body.email || !req.body.tel || !req.body.bloodType || !req.body.units || !req.body.urgency) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    // Units validation
    if (req.body.units <= 0) {
      return res.status(400).json({ message: "Units must be greater than 0." });
    }

    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error creating order" });
  }
};

// GET ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ONE ORDER
const getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE ORDER
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE ORDER
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add this new controller function
const checkDuplicate = async (req, res) => {
  try {
    const { email, tel, name } = req.query;
    
    const existingOrder = await Order.findOne({
      $or: [
        { email: email },
        { tel: tel },
        { name: name }
      ],
      status: "pending" // Only check for pending orders
    });

    return res.status(200).json({
      exists: !!existingOrder,
      message: existingOrder ? 'Duplicate pending order found' : 'No duplicate found'
    });
  } catch (error) {
    return res.status(500).json({
      exists: false,
      message: error.message || 'Error checking for duplicates'
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
  checkDuplicate
};