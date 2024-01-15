const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const twilio = require("twilio");
const redis = require("redis");

const profile = require("../../models/profile_model").profileModel;
const group = require("../../models/group_model").groupModel;

const service = require("../../utilities/service");
const constants = require("../../utilities/constants");
const config = require("../../config/config");
const response = service.response;
const passport = require("passport");
// Create a Twilio client instance with your Twilio credentials
// const twilioClient = twilio("YOUR_TWILIO_ACCOUNT_SID", "YOUR_TWILIO_AUTH_TOKEN");
// Create a Redis client instance
const redisClient = redis.createClient();
var refreshTokens = [];

// exports.login = async (req, res) => {
// 	try {
// 		const phoneNumber = req.body.phone;
// 		const userOTP = req.body.otp;

// 		const user = await profile.findOne({phone: phone});
// 		if (user == null) {
// 			var message = constants.userNotFound;
// 			console.log(message);
// 			var dict = response(req, constants.resultFailure, [], message);
// 			return res.status(400).send(dict);
// 		}

// 		const otp = service.generateOTP();
// 		// Store the OTP in Redis with a 5-minute expiration
// 		redisClient.setex(phoneNumber, 300, otp);

// 		// Send the OTP via Twilio
// 		twilioClient.messages
// 			.create({
// 				body: `Your OTP is: ${otp}`,
// 				from: "YOUR_TWILIO_PHONE_NUMBER",
// 				to: phoneNumber,
// 			})
// 			.then(() => {
// 				console.log("OTP Sent successfully");
// 				// Retrieve the stored OTP from Redis
// 				redisClient.get(phoneNumber, (err, storedOTP) => {
// 					if (err || userOTP !== storedOTP) {
// 						var message = "Incorrect OTP";
// 						console.log(message);
// 						var dict = response(req, constants.resultFailure, [], message);
// 						return res.status(401).send(dict);
// 					} else {
// 						// Successful OTP verification
// 						var message = "Logged in successfully";
// 						console.log(message);
// 						// generating access token
// 						const accessToken = jwt.sign(payload, config.JWT_SECRET, {expiresIn: "1500s"});
// 						const refreshToken = jwt.sign(payload, config.JWT_REFRESH);
// 						// need to store refresh token somewhere --------->
// 						refreshTokens.push(refreshToken);
// 						const payload = {
// 							accessToken: accessToken,
// 							refreshToken: refreshToken,
// 						};
// 						var dict = response(req, constants.resultSuccess, [payload], message);
// 						return res.status(200).send(dict);
// 					}
// 				});
// 			})
// 			.catch((err) => {
// 				res.status(500).json({error: "Failed to send OTP"});
// 			});
// 	} catch (err) {
// 		console.log(err.message);
// 		var message = constants.internalError;
// 		var dict = response(req, constants.resultFailure, [], message);
// 		return res.status(500).send(dict);
// 	}
// };

exports.signup = async (req, res) => {
	try {
		const newProfile = await profile.create(req.body);

		console.log("Signed up successfully");
		var message = "Signed up successfully";
		var dict = response(req, constants.resultSuccess, [newProfile], message);
		return res.status(200).send(dict);
	} catch (err) {
		console.log(err.message);
		var message = constants.internalError;
		var dict = response(req, constants.resultFailure, [], message);
		return res.status(500).send(dict);
	}
};

exports.refToken = async (req, res) => {
	const refreshToken = req.body.token; // using the refresh token to generate new access token
	if (refreshToken == null) {
		var message = "Please pass REFRESH TOKEN";
		console.log(message);
		var dict = response(req, constants.resultSuccess, [], message);
		return res.status(400).send(dict);
	}

	if (!refreshTokens.includes(refreshToken)) {
		var message = "Invalid REFRESH TOKEN";
		console.log(message);
		var dict = response(req, constants.resultFailure, [], message);
		return res.status(401).send(dict);
	}

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
		if (err) {
			var message = "REFRESH TOKEN could not be verified";
			console.log(message);
			var dict = response(req, constants.resultFailure, [], message);
			return res.status(500).send(dict);
		}

		var message = "REFRESH TOKEN verified";
		console.log(message);
		const accessToken = jwt.sign({name: user.name}, config.JWT_SECRET, {expiresIn: "1500s"}); // payload must not have all details
		var dict = response(req, constants.resultSuccess, [{accessToken: accessToken}], message);
		return res.status(500).send(dict);
	});
};

exports.logout = async (req, res) => {
	// deleting the refresh token from DB
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	return res.status(200).send("Logged out successfully");
};

exports.googleLogin = async (req, res) => {
	passport.authenticate("google", {scope: ["profile"]});
	console.log("Google Sign In Route");
};

exports.googleFailedLogin = async (req, res) => {
	console.log("Google Sign In Failed");
	return res.status(200).send("Google Sign In Failed");
};
exports.googleProtected = async (req, res) => {
	console.log("Google Protected Route");
	return res.status(200).send("Google Sign In Passed. You are in protected Route");
};

exports.googleCallback = async (req, res) => {
	passport.authenticate("google", {failureRedirect: "/google/failedlogin", successRedirect: "/google/protected"});
};
