const { User, Referal } = require("../models");

const addUserWithoutPayment = async (req,res)=>{
     await User.create(req.body)
    .then((result) => {
      console.log('adding')
      res.json({ Ok: true });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Ok: false ,message:"Something went wrong" });
    });
}


const handlepayment = (req,res)=>{
    var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

    instance.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: `${req.body.phone1}@iste`,
    })
}



module.exports = {
  addUserWithoutPayment,
  handlepayment,
  
};


