const { User, UserInfo, UserLinks } = require("./users.model");
const Follower = require("./follower.model");
const connectMongo = require("../db/connectMongo.db");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const numUsers = 20;

console.log(process.env.MONGO_DB_URI);
//seeds
// const userSeeding = async () => {
// 	const users = [];
// 	for (let i = 0; i < numUsers; i++) {
// 		users.push({
// 			fullName: `User ${i + 1}`,
// 			username: `user${i + 1}`,
// 			password: `password${i + 1}`,
// 			email: `user${i + 1}@gmail.com`,
// 			phone: `+1234567890${i + 1}`,
// 		});
// 	}
// 	await User.insertMany(users);
// };

// connectMongo().then(() => {
// 	userSeeding().then(() => {
// 		console.log("Seeding complete");
// 	});
// });

const jsonData = [
	{
		_id: {
			$oid: "66124e6d542a986d86b6b6a6",
		},
	},
	{
		_id: {
			$oid: "66124f2cdc9bf95196467d0a",
		},
	},
	{
		_id: {
			$oid: "66124703427423a7ae39b203",
		},
	},
	{
		_id: {
			$oid: "6612476c427423a7ae39b204",
		},
	},
	{
		_id: {
			$oid: "66229cb2b180c7663e1763c9",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327ef3",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327ef4",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327ef5",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327ef6",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327ef7",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327ef8",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327ef9",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327efa",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327efb",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327efc",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327efd",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327efe",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327eff",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327f00",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327f01",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327f02",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327f03",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327f04",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327f05",
		},
	},
	{
		_id: {
			$oid: "6626bdca904fc5d0c3327f06",
		},
	},
];

const idArray = jsonData.map((item) => item._id.$oid);

function formatDate(date) {
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}

// const userInfoSeeding = async () => {
// 	const userInfos = [];
// 	for (let i = 0; i < numUsers; i++) {
// 		userInfos.push({
// 			userId: idArray[i],
// 			bio: `Bio ${i + 1}`,
// 			profession: `Profession ${i + 1}`,
// 			birthday: formatDate(
// 				new Date(Math.floor(Math.random() * 1000000000000))
// 			),
// 			state: `State ${i + 1}`,
// 			country: `Country ${i + 1}`,
// 		});
// 	}
// 	await UserInfo.insertMany(userInfos);
// };

// connectMongo().then(() => {
// 	userInfoSeeding().then(() => {
// 		console.log("Seeding complete");
// 	});
// });

// const userLinksSeeding = async () => {
// 	const userLinks = [];
// 	for (let i = 0; i < numUsers; i++) {
// 		userLinks.push({
// 			userId: idArray[i],
// 			twitter: `Twitter ${i + 1}`,
// 			facebook: `Facebook ${i + 1}`,
// 			linkedin: `LinkedIn ${i + 1}`,
// 			instagram: `Instagram ${i + 1}`,
// 		});
// 	}
// 	await UserLinks.insertMany(userLinks);
// };

// connectMongo().then(() => {
// 	userLinksSeeding().then(() => {
// 		console.log("Seeding complete");
// 	});
// });

const followerSeeding = async () => {
	const followers = [];
	for (let i = 0; i < numUsers; i++) {
		followers.push({
			userId: idArray[i],
			followers: idArray.filter((id) => id !== idArray[i]),
			followerCount: idArray.filter((id) => id !== idArray[i]).length,
			following: idArray.filter((id) => id !== idArray[i]),
			followingCount: idArray.filter((id) => id !== idArray[i]).length,
		});
	}
	await Follower.insertMany(followers);
};

connectMongo().then(() => {
	followerSeeding().then(() => {
		console.log("Seeding complete");
	});
});
