const User = require("../models/user.model");

const getCurrentChatPeople = async (Recievers) => {
	try {
		const promises = Recievers.map(async (reciever) => {
			const findReciever = await User.findOne({ _id: reciever });
			return findReciever;
		});

		const currentChatPeople = await Promise.all(promises);
		return currentChatPeople;
	} catch (error) {
		console.log(
			"Error getting people inside getCurrentChatPeople: ",
			error.message
		);
	}
};

module.exports = { getCurrentChatPeople };
