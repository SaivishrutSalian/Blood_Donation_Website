const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String, required: true },
    bloodType: { type: String, required: true },
    units: { type: Number, required: true },
    urgency: { type: String, required: true },
    date: { type: String },
    status: { type: String, default: "pending" }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);