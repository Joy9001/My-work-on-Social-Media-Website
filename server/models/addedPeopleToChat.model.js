const mongoose = require("mongoose");
const { Schema } = mongoose;

const addedPeopleToChatSchema = new Schema({
	senderId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},

	recivers: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	],
});

const AddedPeopleToChat = mongoose.model(
	"AddedPeopleToChat",
	addedPeopleToChatSchema
);

module.exports = AddedPeopleToChat;
