const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectMongo = require("./db/connectMongo.db");
// const { instrument } = require("@socket.io/admin-ui");

const { app, io, server } = require("./helpers/socket.helper");

const indexRouter = require("./routes/index.route");
const addPeopleToChatRouter = require("./routes/addPeopleToChat.route");
const getConversationRouter = require("./routes/getConversation.route");
const messageRouter = require("./routes/messages.route");

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../client/public")));
app.use(express.static(path.join(__dirname, "../client/src")));
app.use(express.static(path.join(__dirname, "../server/uploads/")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "../client/views"));
app.set("view engine", "ejs");

// instrument(io, {
// 	auth: false,
// 	mode: "development",
// });

app.use(indexRouter);
app.use(addPeopleToChatRouter);
app.use(getConversationRouter);
app.use(messageRouter);

server.listen(PORT, async () => {
	await connectMongo().then(() => {
		console.log(`Server is listening on port http://localhost:${PORT}`);
	});
});
