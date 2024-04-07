const mongoose = require("mongoose");

const connectMongo = async () => {
	try {
		mongoose.connect(process.env.MONGO_DB_URI).then(() => {
			console.log("Connected to MongoDB");
		});
	} catch (error) {
		console.log("Error connecting to MongoDB: ", error.message);
	}
};

module.exports = connectMongo;
