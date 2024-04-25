const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema(
	{
		id: {
			type: Schema.Types.ObjectId,
			default: function () {
				return this._id;
			},
		},
		fullName: {
			type: Schema.Types.String,
			required: [true, "Please enter your full name"],
		},
		username: {
			type: Schema.Types.String,
			required: [true, "Please enter a username"],
			unique: true,
		},
		email: {
			type: Schema.Types.String,
			unique: true,
			validator: [validator.isEmail, "Please enter a valid email"],
			default: "",
		},
		phone: {
			type: Schema.Types.String,
			unique: true,
			validator: [
				validator.isMobilePhone,
				"Please enter a valid phone number",
			],
			default: "",
		},
		password: {
			type: Schema.Types.String,
			required: [true, "Please enter a password"],
			validator: [
				validator.isStrongPassword,
				"Password is not strong enough",
			],
		},
		profilePic: {
			type: Schema.Types.String,
			default: function () {
				return `https://avatar.iran.liara.run/username?username=${this.fullName}`;
			},
		},
		coverPic: {
			type: Schema.Types.String,
			default: "",
		},
		role: {
			type: Schema.Types.String,
			default: "guest",
		},
		permissions: {
			type: Schema.Types.Array,
			default: ["read"],
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

const userInfoSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		bio: {
			type: Schema.Types.String,
			default: "",
		},
		profession: {
			type: Schema.Types.String,
			default: "",
		},
		birthday: {
			type: Schema.Types.String,
			default: "",
		},
		state: {
			type: Schema.Types.String,
			default: "",
		},
		country: {
			type: Schema.Types.String,
			default: "",
		},
	},
	{ timestamps: true }
);

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

const userLinksSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		twitter: {
			type: Schema.Types.String,
			default: "",
			unique: true,
		},
		facebook: {
			type: Schema.Types.String,
			default: "",
			unique: true,
		},
		linkedin: {
			type: Schema.Types.String,
			default: "",
			unique: true,
		},
		instagram: {
			type: Schema.Types.String,
			default: "",
			unique: true,
		},
	},
	{ timestamps: true }
);

const UserLinks = mongoose.model("UserLinks", userLinksSchema);

module.exports = { User, UserInfo, UserLinks };
