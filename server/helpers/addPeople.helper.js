const User = require("../models/user.model");
// const currentUserId = require("./currentUserId.helper.js");

const addPeople = async (currentUserId) => {
	try {
		const people = (await User.find()).filter(
			(person) => person._id.toString() !== currentUserId
		);
		return people;
	} catch (error) {
		console.log("Error getting people for adding: ", error.message);
		return [];
	}
};

module.exports = addPeople;
