const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");
const { addPeopleToChat } = require("../helpers/addPeopleToChat.helper");
const { io, getReceiverSocketId } = require("../helpers/socket.helper");

const sendMessageController = async (req, res) => {
	const { senderId, receiverId, message } = req.body;

	try {
		// Save the message
		const msg = new Message({
			senderId,
			receiverId,
			message,
		});

		const savedMsg = await msg.save();

		// Save the conversation
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (conversation) {
			conversation.messages.push(savedMsg._id);
			await conversation.save();
		} else {
			const newConversation = new Conversation({
				participants: [senderId, receiverId],
				messages: [savedMsg._id],
			});
			await newConversation.save();
		}

		// Add the sender to receiver's chat
		addPeopleToChat(receiverId, senderId);

		// Socket functionality
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", savedMsg);
			console.log("Message sent to receiver", receiverSocketId);
		}

		res.status(201).send(savedMsg);
	} catch (error) {
		console.log("Error saving message: ", error);
	}
};

module.exports = sendMessageController;
