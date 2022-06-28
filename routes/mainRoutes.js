const express = require("express");
const mainController = require("../controllers/mainController");

const router = express.Router();

router.get("/", mainController.index);
router.post("/", mainController.form);


module.exports = router;
