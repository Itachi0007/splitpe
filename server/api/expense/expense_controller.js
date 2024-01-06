const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const profile = require("../../models/profile_model").profileModel;
const group = require("../../models/group_model").groupModel;
const expense = require("../../models/expense_model").expenseModel;

const service = require("../../utilities/service");
const constants = require("../../utilities/constants");
const config = require("../../config/config");
const response = service.response;

exports.addnew = async (req, res) => {
	try {
		const {title, description, amount, currency, isGroup, groupId, createdBy, payers, payees, category, repeat} =
			req.body;

		// Input Validation
		if (!title || !amount || isNaN(amount) || amount <= 0) {
			var message = "Invalid input data";
			console.log(message);
			var dict = response(req, constants.resultSuccess, [], message);
			return res.status(400).send(dict);
		}

		// validate sum and amount
		const totalPayerShare = payers.reduce((sum, payer) => sum + payer.share, 0);
		const totalPayeeShare = payees.reduce((sum, payee) => sum + payee.share, 0);
		if (totalPayerShare != amount || totalPayeeShare != amount) {
			var message = "Share sum is not equal to amount";
			console.log(message);
			var dict = response(req, constants.resultSuccess, [], message);
			return res.status(400).send(dict);
		}

		// validation for checking if a group exists
		if (isGroup) {
			const groupData = await group.findById(groupId);
			if (!groupData) {
				var message = "Invalid group ID";
				console.log(message);
				var dict = response(req, constants.resultSuccess, [], message);
				return res.status(400).send(dict);
			}
		}

		// create a new Expense instance
		const newExpense = new expense({
			description,
			amount,
			title,
			currency,
			isGroup,
			groupId,
			createdBy,
			payers,
			payees,
			category,
			repeat,
		});

		// Save the new expense to the database
		const savedExpense = await newExpense.save();

		// update other entities related to the expense

		var message = "Expense added successfully";
		console.log(message);
		var dict = response(req, constants.resultSuccess, [savedExpense], message);
		return res.status(500).send(dict);
	} catch (err) {
		console.log(err.message);
		var message = err.message;
		var dict = response(req, constants.resultFailure, [], message);
		return res.status(500).send(dict);
	}
};

exports.delete = async (req, res) => {
	try {
		const expenseIdList = req.body.expenseId;

		// since we can delete more than one expense at a time
		for (const exp of expenseIdList) {
			await expense.deleteOne({_id: exp});
		}

		console.log("Expenses deleted");
		var message = "Expenses deleted";
		var dict = response(req, constants.resultSuccess, [], message);
		return res.status(200).send(dict);
	} catch (err) {
		console.log(err.message);
		var message = err.message;
		var dict = response(req, constants.resultFailure, [], message);
		return res.status(500).send(dict);
	}
};
