const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	fullName: {
		type: Schema.Types.String,
		required: true,
	},
	username: {
		type: Schema.Types.String,
		required: true,
		unique: true,
	},
	password: {
		type: Schema.Types.String,
		required: true,
		minlength: 8,
	},
	gender: {
		type: Schema.Types.String,
		required: true,
		enum: ["male", "female", "others"],
	},
	profilePic: {
		type: Schema.Types.String,
		default: "",
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
