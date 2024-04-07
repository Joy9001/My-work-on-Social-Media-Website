const mongoose = require("mongoose");
const User = require("../models/user.model");
const addPeople = require("../helpers/addPeople.helper.js");
const { getPeopleToChat } = require("../helpers/addPeopleToChat.helper.js");
const {
	getCurrentChatPeople,
} = require("../helpers/getCurrentChatPeople.helper.js");

const currentUserId = "66124703427423a7ae39b203";

const messageMiddleware = async (req, res) => {
	try {
		const peopleToAdd = await addPeople();
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

module.exports = messageMiddleware;
