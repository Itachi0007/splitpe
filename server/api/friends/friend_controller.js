const mongoose = require("mongoose");

const profile = require("../../models/profile_model").profileModel;
const group = require("../../models/group_model").groupModel;
const expense = require("../../models/expense_model").expenseModel;

const service = require("../../utilities/service");
const constants = require("../../utilities/constants");
const config = require("../../config/config");
const response = service.response;

exports.myFriends = async function (req, res) {
	try {
		const userId = req.query.profileId;
		const userData = await profile.findById(userId).populate("myFriends.friendId");

		if (!userData) {
			var message = constants.userNotFound;
			console.log(message);
			var dict = service.response(req, constants.resultSuccess, [], message);
			return res.status(400).send(dict);
		}

		var message = "Friends fetched successfully";
		console.log(message);
		var dict = service.response(req, constants.resultSuccess, [userData], message);
		return res.status(200).send(dict);
	} catch (err) {
		console.log(err.message);
		var message = constants.internalError;
		var dict = response(req, constants.resultFailure, [], message);
		return res.status(500).send(dict);
	}
};
