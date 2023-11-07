const mongoose = require("mongoose");

const service = require("../../utilities/service");
const constants = require("../../utilities/constants");
const config = require("../../config/config");
const profile = require("../../models/profile_model").profileModel;
const group = require("../../models/group_model").groupModel;

const response = service.response;

exports.myGroups = async function (req, res) {
	try {
		const userId = req.body.userId;

		var groupList = await group.find({members: {$in: [userId]}});

		var message = "Groups fetched successfully";
		console.log(message);
		var dict = service.response(req, constants.resultSuccess, [homeData], message);
		return res.status(200).send(dict);
	} catch (err) {
		console.log(err.message);
		var message = constants.internalError;
		var dict = response(req, constants.resultFailure, [], message);
		return res.status(500).send(dict);
	}
};
