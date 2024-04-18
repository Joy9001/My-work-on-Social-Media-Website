const addPeople = require("../helpers/addPeople.helper.js");
const { getPeopleToChat } = require("../helpers/addPeopleToChat.helper.js");
const {
	getCurrentChatPeople,
} = require("../helpers/getCurrentChatPeople.helper.js");
const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");
const { addPeopleToChat } = require("../helpers/addPeopleToChat.helper");
const { io, getReceiverSocketId } = require("../helpers/socket.helper");
// const currentUserId = require("../helpers/currentUserId.helper.js");

const messageController = async (req, res) => {
	const currentUserId = req.params.id;
	try {
		const peopleToAdd = await addPeople(currentUserId);
		const currentUserAddedPeopleToChat = await getPeopleToChat(
			currentUserId
		);
		// console.log(currentChatPeople);
		let currentChatPeople = [];
		if (currentUserAddedPeopleToChat) {
			currentChatPeople = await getCurrentChatPeople(
				currentUserAddedPeopleToChat.recivers
			);
			// console.log("currentChatPeople: ", currentChatPeople);
		}

		let unreadMsgCount = [];
		if (currentChatPeople) {
			currentChatPeople.forEach(async (person) => {
				let findConversation = await Conversation.findOne({
					participants: { $all: [currentUserId, person._id] },
				});
				// console.log("findConversation: ", findConversation);
				if (findConversation) {
					let findUnreadMsgCount =
						findConversation.unreadMsgCount.find(
							(obj) =>
								obj.userId.toString() === person._id.toString()
						);

					if (findUnreadMsgCount) {
						unreadMsgCount.push(findUnreadMsgCount);
					} else {
						unreadMsgCount.push({
							userId: person._id,
							unreadCount: 0,
						});
					}
				} else {
					unreadMsgCount.push({
						userId: person._id,
						unreadCount: 0,
					});
				}
			});
		}

		// print
		unreadMsgCount.forEach((obj) => {
			console.log("Unread Msg Count: ", obj);
		});

		return res.render("messages", {
			peopleToAdd: peopleToAdd,
			currentUserId: currentUserId,
			currentChatPeople: currentChatPeople,
			unreadMsgCount: unreadMsgCount,
		});
	} catch (error) {
		console.log("Error getting people: ", error);
	}
};

const sendMessageController = async (req, res) => {
	const { senderId, receiverId, message } = req.body;

	try {
		//find conversation
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		// If not found create one
		if (conversation === null) {
			conversation = new Conversation({
				participants: [senderId, receiverId],
				messages: [],
				unreadMsgCount: [
					{
						userId: receiverId,
						unreadCount: 1,
					},
				],
			});
		}

		if (!conversation.isBlocked) {
			// Save the message
			const msg = new Message({
				senderId,
				receiverId,
				message,
			});

			const savedMsg = await msg.save();

			conversation.messages.push(savedMsg._id);
			await conversation.save();

			// Add the sender to receiver's chat
			addPeopleToChat(receiverId, senderId);

			// Socket functionality
			const receiverSocketId = getReceiverSocketId(receiverId);
			if (receiverSocketId) {
				io.to(receiverSocketId).emit("newMessage", savedMsg, senderId);
				console.log("Message sent to receiver", receiverSocketId);
			}

			res.status(201).send(savedMsg);
		} else {
			res.status(400).send("You are blocked by the receiver");
		}
	} catch (error) {
		console.log("Error saving message: ", error);
	}
};

const deleteMessageController = async (req, res) => {
	const { senderId, receiverId, msgId } = req.body;
	console.log("Message Id: ", msgId);
	try {
		const findMsg = await Message.findOne({
			_id: msgId,
		});
		if (findMsg) {
			try {
				const deleteMessage = await Message.deleteOne({
					_id: msgId,
				});

				await Conversation.updateOne(
					{
						participants: { $all: [senderId, receiverId] },
					},
					{
						$pull: { messages: msgId },
					}
				);
				// console.log(deleteMessage);
				if (deleteMessage.acknowledged === true) {
					// Socket functionality
					const receiverSocketId = getReceiverSocketId(receiverId);
					if (receiverSocketId) {
						io.to(receiverSocketId).emit("deleteMessage", msgId);
						console.log(
							"Deleted Message Id sent to receiver",
							receiverSocketId
						);
					}
					return res.status(200).json({ message: "Message deleted" });
				}
			} catch (error) {
				console.log("Error deleting message: ", error.message);
			}
		} else {
			return res.json({ message: "Message not found" });
		}
	} catch (error) {
		console.log("Error finding message: ", error.message);
	}
};

const unreadMessageController = async (req, res) => {
	const {
		senderId,
		receiverId,
		unreadMsgCount: newUnreadMsgCount,
	} = req.body;
	try {
		let findConversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (findConversation) {
			let findUnreadMsgCount = findConversation.unreadMsgCount.find(
				(obj) => obj.userId.toString() === receiverId.toString()
			);

			if (findUnreadMsgCount) {
				findUnreadMsgCount.unreadCount = newUnreadMsgCount;
			} else {
				findConversation.unreadMsgCount.push({
					userId: receiverId,
					unreadCount: newUnreadMsgCount,
				});
			}
			await findConversation.save();
		} else {
			let newConversation = new Conversation({
				participants: [senderId, receiverId],
				unreadMsgCount: [
					{
						userId: receiverId,
						unreadCount: newUnreadMsgCount,
					},
				],
			});
			await newConversation.save();
		}
		return res
			.status(200)
			.json({ message: "Unread message count updated" });
	} catch (error) {
		console.log("Error updating unread message count: ", error.message);
	}
};

module.exports = {
	messageController,
	sendMessageController,
	deleteMessageController,
	unreadMessageController,
};
