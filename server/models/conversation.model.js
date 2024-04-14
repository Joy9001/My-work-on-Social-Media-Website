const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user.model.js");
const Message = require("./message.model.js");

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: Schema.Types.ObjectId,
				ref: User,
			},
		],
		messages: [
			{
				type: Schema.Types.ObjectId,
				ref: Message,
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
