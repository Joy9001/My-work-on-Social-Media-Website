const express = require("express");
const router = express.Router();
const sendMessageController = require("../controllers/sendMessage.controller");

router.post("/send-message", sendMessageController);

module.exports = router;
