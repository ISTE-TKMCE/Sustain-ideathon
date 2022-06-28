const { User, Referal } = require("../models");
const Razorpay = require("razorpay");
require("dotenv").config();

const addUserWithoutPayment = async (req, res) => {
  await User.create(req.body)
    .then((result) => {
      console.log("adding");
      res.json({ Ok: true });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Ok: false, message: "Something went wrong" });
    });
};

const createOrderId = (req, res) => {
  var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  var options = {
    amount: 20000, // amount in the smallest currency unit
    currency: "INR",
    receipt: `Athena TKMCE`,
  };
  instance.orders.create(options, function (err, order) {
    res.send({ orderId: order.id });
  });
};

const verifyPayment = (req, res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;
  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("sig received ", req.body.response.razorpay_signature);
  console.log("sig generated ", expectedSignature);
  var response = { signatureIsValid: "false" };
  if (expectedSignature === req.body.response.razorpay_signature)
    response = { signatureIsValid: "true" };
  res.send(response);
};

module.exports = {
  addUserWithoutPayment,
  createOrderId,
  verifyPayment,
};
