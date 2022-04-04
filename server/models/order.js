const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
   userId: {
     type: String,
     ref:"User"
   },
   orgId: {
     type: String,
     ref:"User"
   },
   order_amount: {
     type: Number,
     required:true
   },
   status: {
     type: Boolean,
     default: false
   },
   order_id: {
     type: String,
     default: null
   },
   payment_id: {
     type: String,
     default: null
   }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);