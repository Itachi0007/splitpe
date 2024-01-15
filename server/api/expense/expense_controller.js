const mongoose = require("mongoose");
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
		const {title, description, amount, currency, isGroup, groupId, createdBy, users, category, repeat} = req.body;

		// Input Validation
		if (!title || !amount || isNaN(amount) || amount <= 0) {
			var message = "Invalid input data";
			console.log(message);
			var dict = response(req, constants.resultSuccess, [], message);
			return res.status(400).send(dict);
		}

		// validate sum and amount
		const totalPayerShare = users.reduce((sum, user) => sum + user.paid, 0);
		const totalPayeeShare = users.reduce((sum, user) => sum + user.owes, 0);
		if (totalPayerShare != amount || totalPayeeShare != amount) {
			var message = "Share sum is not equal to amount";
			console.log(message);
			var dict = response(req, constants.resultSuccess, [], message);
			return res.status(400).send(dict);
		}

		// validate all users mentioned in the expense
		const userIdArray = [];
		users.forEach((user) => userIdArray.push(user.id));
		var isValid = await service.validateUsers(userIdArray); // will return true else the userID which is invalid
		if (isValid != true) {
			var message = "Invalid user ID - " + isValid;
			console.log(message);
			var dict = response(req, constants.resultSuccess, [], message);
			return res.status(400).send(dict);
		}

		// validation for checking if the group & members are correct
		var groupData;
		if (isGroup && groupId) {
			groupData = await group.findById(groupId);
			if (!groupData) {
				var message = "Invalid group ID";
				console.log(message);
				var dict = response(req, constants.resultSuccess, [], message);
				return res.status(400).send(dict);
			}

			// check if all users are group members
			var members = groupData.members;
			if (members.toString() != userIdArray.toString()) {
				var message = "Not all users are group members";
				console.log(message);
				var dict = response(req, constants.resultSuccess, [], message);
				return res.status(400).send(dict);
			}
		}

		const expenseStatement = computeStatements(users);
		console.log(expenseStatement); // [ { debtor: 'user789', creditor: 'user101', balance: 10 } ]

		// update group balance
		if (isGroup == true && groupId) {
			for (const user of users) {
				// for every user in expense
				const userData = await profile.findById(user.id);
				userData.myGroups.forEach((group) => {
					if (group.groupId === groupId) {
						// if the group matches update his net balance
						group.balance += user.paid - user.owes;
					}
				});

				await userData.save();
			}
		}

		// update friends balance
		for (const statement of expenseStatement) {
			var isFriend = false;
			// update debit leg
			const debtorData = await profile.findById(statement.debtor);
			for (const debtorFriend of debtorData.myFriends) {
				isFriend = false;
				if (debtorFriend.friendId == statement.creditor) {
					debtorFriend.balance -= statement.balance;
					isFriend = true;
				}
			}
			// in case they are not friends
			if (!isFriend) {
				console.log("Adding new friend to debtor");
				const newFriend = {
					friendId: statement.creditor,
					balance: -statement.balance,
				};
				debtorData.myFriends.push(newFriend);
			}
			debtorData.save();

			// update credit leg
			const creditorData = await profile.findById(statement.creditor);
			for (const creditorFriend of creditorData.myFriends) {
				isFriend = false;
				if (creditorFriend.friendId == statement.debtor) {
					creditorFriend.balance += statement.balance;
					isFriend = true;
				}
			}

			// in case they are not friends
			if (!isFriend) {
				console.log("Adding new friend to creditor");
				const newFriend = {
					friendId: statement.debtor,
					balance: statement.balance,
				};
				creditorData.myFriends.push(newFriend);
			}
			creditorData.save();
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
			users,
			category,
			repeat,
			statements: expenseStatement,
		});
		const savedExpense = await newExpense.save();

		var message = "Expense added successfully";
		console.log(message);
		var dict = response(req, constants.resultSuccess, [expenseStatement], message);
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

exports.update = async (req, res) => {
	try {
		const expenseData = await expense.findById(req.params.id);

		if (!expenseData) {
			var message = "Invalid expense ID";
			console.log(message);
			var dict = response(req, constants.resultSuccess, [], message);
			return res.status(400).send(dict);
		}

		// Update fields based on the request body
		expenseData.title = req.body.title || expenseData.title;
		expenseData.description = req.body.description || expenseData.description;
		expenseData.amount = req.body.amount || expenseData.amount;
		expenseData.currency = req.body.currency || expenseData.currency;
		expenseData.repeat = req.body.repeat || expenseData.repeat;
		expenseData.users = req.body.users || expenseData.users;
		expenseData.category = req.body.category || expenseData.category;

		// Save the updated expense
		const updatedExpense = await expenseData.save();

		// NEED TO REVERT ALL OTHER ENTITIES BALANCES ETC....

		var message = "Expense updated successfully";
		console.log(message);
		var dict = response(req, constants.resultSuccess, [updatedExpense], message);
		return res.status(200).send(dict);
	} catch (error) {
		console.log(err.message);
		var message = err.message;
		var dict = response(req, constants.resultFailure, [], message);
		return res.status(500).send(dict);
	}
};

exports.get = async (req, res) => {
	try {
		const expenseData = await expense.findById(req.params.id);
		if (!expenseData) {
			var message = "Invalid expense ID";
			console.log(message);
			var dict = response(req, constants.resultSuccess, [], message);
			return res.status(400).send(dict);
		}

		var message = "Expense fetched successfully";
		console.log(message);
		var dict = response(req, constants.resultSuccess, [expenseData], message);
		return res.status(200).send(dict);
	} catch (error) {
		console.log(err.message);
		var message = err.message;
		var dict = response(req, constants.resultFailure, [], message);
		return res.status(500).send(dict);
	}
};

function computeStatements(shares) {
	// Create a map to track balances for each person
	let balances = new Map();

	// Populate balances based on shares
	for (let share of shares) {
		let {id, paid, owes} = share;
		balances.set(id, (balances.get(id) || 0) + paid - owes);
	}

	// Convert balances map to an array of objects for easy sorting
	let balancesArray = Array.from(balances, ([id, balance]) => ({id, balance}));

	// Sort balancesArray by balance
	balancesArray.sort((a, b) => a.balance - b.balance);

	// Initialize pointers for settling shares
	let i = 0;
	let j = balancesArray.length - 1;

	// Store the minimum shares
	let statements = [];

	// Find minimum shares
	while (i < j) {
		let debtor = balancesArray[i];
		let creditor = balancesArray[j];

		let minAmount = Math.min(-debtor.balance, creditor.balance);

		// Create a share statement
		let statement = {
			debtor: debtor.id,
			creditor: creditor.id,
			balance: Math.abs(minAmount),
		};
		statements.push(statement);

		// Update balances after settling debts
		debtor.balance += minAmount;
		creditor.balance -= minAmount;

		// Move pointers accordingly
		if (debtor.balance === 0) i++;
		if (creditor.balance === 0) j--;
	}

	return statements;
}
