const mongoose = require("mongoose");

const profile = require("../../models/profile_model").profileModel;
const group = require("../../models/group_model").groupModel;
const expense = require("../../models/expense_model").expenseModel;

const service = require("../../utilities/service");
const constants = require("../../utilities/constants");
const config = require("../../config/config");
const response = service.response;

exports.myGroups = async function (req, res) {
	try {
		const userId = req.query.profileId;

		const userData = await profile.findById(userId).populate("myGroups.groupId");

		var message = "Groups fetched successfully";
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

exports.groupbalance = async function (req, res) {
	try {
		const userId = req.body.userId;
		const groupId = req.body.groupId;

		// Find all expense within the group.
		const expenseList = await expense.find({groupId: groupId});

		// Create a balance object to store user balances.
		const balance = {};

		expenseList.forEach((transaction) => {
			// Process payers and their shares.
			transaction.payers.forEach((payer) => {
				const payerId = payer.user;
				const payerShare = payer.share;

				if (!balance[payerId]) {
					balance[payerId] = 0;
				}

				// Update payer's balance.
				balance[payerId] -= payerShare;
			});

			// Process payees and their shares.
			transaction.payees.forEach((payee) => {
				const payeeId = payee.user;
				const payeeShare = payee.share;

				if (!balance[payeeId]) {
					balance[payeeId] = 0;
				}

				// Update payee's balance.
				balance[payeeId] += payeeShare;
			});
		});

		var message = "Balance calculated successfully";
		console.log(message);
		var dict = service.response(req, constants.resultSuccess, [balance], message);
		return res.status(200).send(dict);
	} catch (err) {
		console.log(err.message);
		var message = constants.internalError;
		var dict = response(req, constants.resultFailure, [], message);
		return res.status(500).send(dict);
	}
};

exports.newGroup = async function (req, res) {
	try {
		console.log("reaching req");
		// Basic validation for required fields
		if (!req.body.name || !req.body.members || !req.body.createdBy || !req.body.currency) {
			var message = "Missing required information";
			console.log(message);
			var dict = response(req, constants.resultFailure, [message], message);
			return res.status(400).send(dict);
		}

		// Validate currency against the enum values
		const validCurrencies = ["INR", "USD"];
		if (!validCurrencies.includes(req.body.currency)) {
			var message = "Invalid currency selected";
			console.log(message);
			var dict = response(req, constants.resultFailure, [message], message);
			return res.status(400).send(dict);
		}

		// Create a new group
		const newGroup = await group.create(req.body);
		var message = "Group created successfully";
		console.log(message);
		var dict = response(req, constants.resultSuccess, [newGroup], message);
		return res.status(200).send(dict);
	} catch (err) {
		console.log(err.message);
		var message = err.message;
		var dict = response(req, constants.resultFailure, [message], message);
		return res.status(500).send(dict);
	}
};
