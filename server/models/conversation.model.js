const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user.model.js");
const Message = require("./message.model.js");

const unreadMsgCountSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: User,
		required: true,
	},
	unreadCount: {
		type: Number,
		required: true,
		default: 0,
	},
});

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
		isBlocked: {
			type: Schema.Types.Boolean,
			default: false,
		},
		unreadMsgCount: [unreadMsgCountSchema],
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
