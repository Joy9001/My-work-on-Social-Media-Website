const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user.model.js");
const Message = require("./message.model.js");

const unreadMsgCountSchema = new Schema({
	senderId: {
		type: Schema.Types.ObjectId,
		ref: User,
		required: [true, "senderId is required"],
	},
	receiverId: {
		type: Schema.Types.ObjectId,
		ref: User,
		required: [true, "receiverId is required"],
	},
	unreadCount: {
		type: Number,
		required: [true, "unreadCount is required"],
		default: 0,
	},
});

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: Schema.Types.ObjectId,
				ref: User,
				required: [true, "participants are required"],
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
