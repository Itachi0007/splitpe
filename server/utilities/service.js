const config = require("../config/config");
const jwt = require("jsonwebtoken");
const profile = require("../models/profile_model").profileModel;

var constants = require("./constants");

const response = function (req, result, data, message) {
	var dict = {
		result: result, // success or failure
		method: req.method,
		source: req.url,
		info: message, // if any error message or if OK
		data: data, // whatever data is being fetched
	};
	return dict;
};

function authenticateToken(req, res, next) {
	// authenticate the user's token
	const authHeader = req.headers["authorization"]; // getting the auth data from header
	const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
	if (!token) {
		var message = "PLEASE PASS A TOKEN";
		console.log(message);
		var dict = response(req, constants.resultFailure, [], message);
		return res.status(400).send(dict);
	}
	jwt.verify(token, config.JWT_SECRET, (err, payload) => {
		if (err) {
			var dict = response(req, constants.resultFailure, [], "Invalid token passed");
			return res.status(403).send(dict);
		}
		console.log("Token Authenticated on server");
		req.user = payload;
		next();
	});
}

function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000);
}

const validateUsers = async (users) => {
	for (const user of users) {
		const existingUser = await profile.findById(user);
		if (!existingUser) {
			return user;
		}
	}
	console.log(users);
	return true;
};

module.exports = {
	response,
	authenticateToken,
	generateOTP,
	validateUsers,
};
