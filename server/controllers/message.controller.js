const mongoose = require("mongoose");
const User = require("../models/user.model.js");
const addPeople = require("../helpers/addPeople.helper.js");
const { getPeopleToChat } = require("../helpers/addPeopleToChat.helper.js");
const {
	getCurrentChatPeople,
} = require("../helpers/getCurrentChatPeople.helper.js");

// const currentUserId = require("../helpers/currentUserId.helper.js");

const messageController = async (req, res) => {
	const currentUserId = req.params.id;
	try {
		const peopleToAdd = await addPeople(currentUserId);
		const currentUserAddedPeopleToChat = await getPeopleToChat(
			currentUserId
		);
		// console.log(currentChatPeople);
		let currentChatPeople = [];
		if (currentUserAddedPeopleToChat) {
			currentChatPeople = await getCurrentChatPeople(
				currentUserAddedPeopleToChat.recivers
			);
			// console.log("currentChatPeople: ", currentChatPeople);
		}

		return res.render("messages", {
			peopleToAdd: peopleToAdd,
			currentUserId: currentUserId,
			currentChatPeople: currentChatPeople,
		});
	} catch (error) {
		console.log("Error getting people: ", error.message);
	}
};

module.exports = messageController;
