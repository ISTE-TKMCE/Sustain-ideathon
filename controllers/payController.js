const { User, Referal } = require("../models");
const Razorpay = require("razorpay");
require("dotenv").config();
const mailController = require("./mailController");


const addUserWithoutPayment = async (req, res) => {
  await User.create(req.body)
    .then((result) => {
      console.log("adding");
      res.json({ Ok: true });
    })
    .catch(async (err) => {
      console.log(err);
      if(err.name == 'SequelizeUniqueConstraintError'){
        const user =   await User.findOne({ where: { email: req.body.email } })
        user.paymentId ?  res.json({ Ok: false, message: "Already registered" }) : res.json({ Ok: true });
      }else{
        res.json({ Ok: false, message: "Something went wrong" });
      } 
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
  if (expectedSignature === req.body.response.razorpay_signature){
      response = { signatureIsValid: "true" };
      mailController.sendmail(req, res);
       User.update(
        {
            orderId:req.body.response.razorpay_order_id,
            paymentSignature: req.body.response.razorpay_signature,
            paymentId : req.body.response.razorpay_payment_id
            
        },
        {where:{email: req.body.email}}
        )
    .then(result =>console.log(result))
    .catch(err => console.log(err))
  }
  res.send(response);
};

module.exports = {
  addUserWithoutPayment,
  createOrderId,
  verifyPayment,
};
