const mongoose = require("mongoose");
const { Schema } = mongoose;

const convertaionSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [
			{
				type: Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", convertaionSchema);

module.exports = Conversation;
