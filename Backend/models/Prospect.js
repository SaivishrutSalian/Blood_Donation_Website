const mongoose = require("mongoose");
const ProspectSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    address:{type:String},
    tel:{type:String},
    bloodGroup: { // Changed from "bloodgroup" to match frontend
      type: String,
      required: true
    },
    weight:{type:Number},
    date:{type:String},
    diseases:{type:String},
    age:{type:Number},
    bloodpressure:{type:Number},
    status:{type:Number, default:0}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prospect", ProspectSchema);