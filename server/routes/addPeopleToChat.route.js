const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { addPeopleToChat } = require("../helpers/addPeopleToChat.helper.js");
const User = require("../models/user.model");

router.post("/add-people-to-chat", async (req, res) => {
	try {
		// console.log(req.body);
		const { senderId, recieverId } = req.body;
		const recieverObjectid = new mongoose.Types.ObjectId(`${recieverId}`);
		const result = await addPeopleToChat(senderId, recieverId);
		const findReciever = await User.findOne({
			_id: recieverObjectid,
		});
		// console.log(`findReciever: ${findReciever}`);
		if (result === "Already exists in the chat") {
			return res.json({
				message: "Already exists in the chat",
			});
		} else if (result === "Error adding people to chat") {
			return res
				.status(404)
				.json({ message: "Error adding people to chat" });
		}
		res.json({ message: "Added people to chat", newPeople: findReciever });
	} catch (error) {
		console.log("Error adding people to chat: ", error.message);
	}
});

module.exports = router;
