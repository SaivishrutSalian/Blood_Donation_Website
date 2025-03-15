const ejs = require("ejs");
const dotenv = require("dotenv");
const sendMail = require("../helpers/sendMail");
const Order = require("../models/Order");

dotenv.config();

const sendOrderApprovalEmail = async () => {
  const orders = await Order.find({ status: 0 });

  if (orders.length > 0) {
    for (let order of orders) {
      ejs.renderFile(
        "templates/BloodDonationOrderApproval.ejs",
        {
          name: order.name,
          bloodType: order.bloodType,
          units: order.units,
          urgency: order.urgency
        },
        async (err, data) => {
          let messageoption = {
            from: process.env.EMAIL,
            to: order.email,
            subject: "Blood Order Request Approved - LifeSource",
            html: data,
          };

          try {
            await sendMail(messageoption);
            await Order.findByIdAndUpdate(order._id, { $set: { status: 1 } });
            await Order.findByIdAndDelete(order._id);
          } catch (error) {
            console.log(err);
          }
        }
      );
    }
  }
};

module.exports = { sendOrderApprovalEmail };