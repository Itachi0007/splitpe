require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
	PORT: process.env.PORT || 8080,
	DB_URI: isProduction ? process.env.DATABASE_URL : "mongodb://0.0.0.0:27017/SplitFree",
	JWT_SECRET: process.env.TOKEN_SECRET,
	JWT_REFRESH: process.env.REFRESH_TOKEN,
	SID: process.env.SID,
	awsAccessKey: "",
	awsSecretKey: "",
	razorpayId: process.env.razorpaytest_id,
	razorpaySecret: process.env.razorpaytest_secret,
};
