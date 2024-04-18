const express = require("express");
const router = express.Router();
const {
	sendMessageController,
	deleteMessageController,
	unreadMessageController,
} = require("../controllers/message.controller");
// const

router.post("/send-message", sendMessageController);

router.post("/delete-message", deleteMessageController);

router.post("/unread-message", unreadMessageController);
module.exports = router;
