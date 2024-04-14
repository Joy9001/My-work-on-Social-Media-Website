const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversation.model.js");
const getConversation = require("../helpers/getConversation.helper.js");

router.post("/get-conversation", async (req, res) => {
	const { senderId, receiverId } = req.body;
	// console.log(senderId, receiverId);

	try {
		const findConversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});
		// console.log(findConversation);
		if (findConversation) {
			if (findConversation.messages.length === 0) {
				return res.status(200).json({ messages: [] });
			} else {
				try {
					const conversation = await getConversation(
						findConversation.messages
					);
					return res.status(200).json({ messages: conversation });
				} catch (error) {
					console.log("Error getting conversation: ", error.message);
				}
			}
		} else {
			return res.status(200).json({ messages: [] });
		}
	} catch (error) {
		console.log("Error getting conversation: ", error.message);
	}
});

module.exports = router;
