const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema({
	fullName: {
		type: Schema.Types.String,
		required: [true, "Please enter your full name"],
	},
	username: {
		type: Schema.Types.String,
		required: [true, "Please enter a username"],
		unique: true,
	},
	password: {
		type: Schema.Types.String,
		required: [true, "Please enter a password"],
		validator: [
			validator.isStrongPassword,
			"Password is not strong enough",
		],
	},
	gender: {
		type: Schema.Types.String,
		required: [true, "Please enter your gender"],
		enum: ["male", "female", "others"],
	},
	profilePic: {
		type: Schema.Types.String,
		default: "",
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
