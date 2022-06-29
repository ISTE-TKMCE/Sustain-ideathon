const { User, Referal } = require("../models");
const payController = require("./payController");
require("dotenv").config();

const index = (req, res) => {
  res.render("index", { keyId: process.env.KEY_ID  , amount : process.env.REG_FEE /100});
};

const welcome = (req, res) => {
  res.render("welcome");
};

const form = async (req, res) => {
  console.log(req.body);

  if (req.body.isRefId) {
    const ref = await Referal.findOne({ where: { cacode: req.body.refid } });

    if (ref) {
      //valid referal code
      const user = await User.findOne({ where: { email: req.body.email } });
      console.log(user);
      if (user?.paymentId) {
        res.json({ Ok: false, message: "Already Registered" })
      } else{
        //create user with out payment
        await payController.addUserWithoutPayment(req, res);
        console.log("added");
      };

      //payment controller
    } else {
      res.json({ Ok: false, message: "Invalid referal id" });
    }

  } else {
    await payController.addUserWithoutPayment(req, res);
    console.log("added2");
  }
};

module.exports = {
  index,
  form,
  welcome
};
