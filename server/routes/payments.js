const express = require("express");
const router = express.Router();

const {
  createOrder,
  paymentVerification,
} = require("../controllers/payments");

const { requireSignin} = require("../controllers/auth");
//CREATE ORDER ROUTE
router.post('/order/create', createOrder);
router.post('/order/verify', paymentVerification)
module.exports = router;