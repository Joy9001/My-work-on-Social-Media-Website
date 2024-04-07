const mongoose = require("mongoose");
const AddedPeopleToChat = require("../models/addedPeopleToChat.model");
// const user = require("../models/user.model");

const addPeopleToChat = async (senderId, recieverId) => {
	try {
		// console.log("inside addPeopleToChat: ", senderId);
		const findSender = await AddedPeopleToChat.findOne({
			senderId: senderId,
		});

		if (findSender) {
			if (findSender.recivers.includes(recieverId))
				return "Already exists in the chat";

			findSender.recivers.push(recieverId);
			await findSender.save();
		} else {
			const addedpeople = new AddedPeopleToChat({
				senderId,
				recivers: [recieverId],
			});

			await addedpeople.save();
		}
		return "Added people to chat";
	} catch (err) {
		console.log("Error adding people to chat: ", err);
		return "Error adding people to chat";
	}
};

const getPeopleToChat = async (senderId) => {
	try {
		const people = await AddedPeopleToChat.findOne({
			senderId: senderId,
		});
		return people;
	} catch (error) {
		console.log("Error getting people: ", error.message);
		return [];
	}
};

module.exports = { addPeopleToChat, getPeopleToChat };
