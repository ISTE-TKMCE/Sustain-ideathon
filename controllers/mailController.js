require('dotenv').config()
const { append } = require("express/lib/response");
const nodemailer = require("nodemailer");
// mail Config
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
  auth: {
    user: process.env.EMAILID,
    pass: process.env.EMAILPASS,
  },
});

const sendmail = (req, res) => {
 
    const mailOptions = {
      from: "support@istetkmce.in",
      to: req.body.email,
      subject: "Welcome to Athena'22 !",
      html: `<center> <img src="https://athena.istetkmce.in/assets/img/athena.png" alt="athena logo" width="100" ></center>Greetings from ISTE TKMCE,<br><br>
      Great to have you on board, ${req.body.name} ! You are the Face of Athena'22 at ${req.body.college} ! <br><br>
      We will get in touch with you soon. <br><br>
    
      
      Regards,<br>
      Team Athena'22 <br>
      ISTE TKMCE`   
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

  console.log('sending response')
};

module.exports = {
  sendmail,
};
