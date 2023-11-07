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
	} catch (err) {
		console.log(err.message);
		var message = constants.internalError;
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
		var message = constants.internalError;
		var dict = response(req, constants.resultFailure, [], message);
		return res.status(500).send(dict);
	}
};
