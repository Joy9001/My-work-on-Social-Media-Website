const User = require("../models/user.model");

const addPeople = async () => {
	try {
		const people = await User.find();
		return people;
	} catch (error) {
		console.log("Error getting people for adding: ", error.message);
		return [];
	}
};

module.exports = addPeople;
