const express = require("express");
const mainController = require("../controllers/mainController");
const payController = require("../controllers/payController");


const router = express.Router();

router.get("/", mainController.index);
router.post("/", mainController.form);
router.get("/welcome", mainController.welcome);


router.post("/create/orderId", payController.createOrderId);
router.post("/api/payment/verify", payController.verifyPayment);


module.exports = router;
