const express = require("express");
const router = express.Router();
const messageMiddleware = require("../middlewares/message.middleware.js");

// const people = ['Sekiro', 'Emma', 'Isshin', 'Genichiro', 'Lord Kuro', 'Owl'];

router.get("/", (req, res, next) => {
	res.send("Hello World");
});

router.get("/messages", messageMiddleware);

module.exports = router;
