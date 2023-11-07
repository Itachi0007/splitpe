const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const profile = require("../../models/profile_model").profileModel;
const group = require("../../models/group_model").groupModel;

const service = require("../../utilities/service");
const constants = require("../../utilities/constants");
const config = require("../../config/config");

const response = service.response;

exports.login = async (req, res) => {
	try {
		const phone = req.body.phone;
		const otp = req.body.otp;

		const user = await profile.findOne({phone: phone});
		if (user == null) {
			var message = constants.userNotFound;
			console.log(message);
			var dict = response(req, constants.resultFailure, [], message);
			return res.status(400).send(dict);
		}

		// we will use OTP auth on phone
		if (otp == sent_otp) {
			const payload = {
				name: user.name,
			};
			// generating access token
			const accessToken = jwt.sign(payload, config.JWT_SECRET, {expiresIn: "15s"});
			const refreshToken = jwt.sign(payload, config.JWT_REFRESH);
			refreshTokens.push(refreshToken);
			res.json({accessToken: accessToken, refreshToken: refreshToken});
		} else {
			var message = "Incorrect OTP";
			console.log(message);
			var dict = response(req, constants.resultFailure, [], message);
			return res.status(401).send(dict);
		}
	} catch (err) {
		console.log(err.message);
		var message = constants.internalError;
		var dict = response(req, constants.resultFailure, [], message);
		return res.status(500).send(dict);
	}
};

exports.signup = async (req, res) => {
	try {
		console.log("Signed up successfully");
		var message = "Signed up successfully";
		var dict = response(req, constants.resultSuccess, [], message);
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
	if (refreshToken == null) return res.status(401).send("Please pass a refresh token");

	if (!refreshTokens.includes(refreshToken)) return res.status(403).send("Invalid refresh token");

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
		if (err) return res.status(403).send("Token couldn't be verified");
		const accessToken = jwt.sign({name: user.name}, config.JWT_SECRET, {expiresIn: "30s"}); // payload must not have all details
		res.json({accessToken: accessToken});
	});
};

exports.logout = async (req, res) => {
	// deleting the refresh token from DB
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	return res.status(200).send("Logged out successfully");
};
