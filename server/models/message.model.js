const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user.model.js");

const messageSchema = new Schema(
	{
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
		message: {
			type: Schema.Types.String,
			required: [true, "message is required"],
		},
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
