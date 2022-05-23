const express = require("express");
const router = express.Router();

const {
  createOrder,
  paymentVerification,
  read,
  readAll
} = require("../controllers/payments");

const { requireSignin} = require("../controllers/auth");
//CREATE ORDER ROUTE
router.post('/order/create', createOrder);
router.post('/order/verify', paymentVerification);
router.get('/order/:id', requireSignin, read);
router.get('/order/all/:id', requireSignin, readAll);
module.exports = router;