const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
	{
		title: {type: String, required: true},
		description: {type: String},
		amount: {type: Number, required: true}, // all payer shared sum must be equal to amount
		currency: {type: String, enum: ["INR", "USD"]},
		isGroup: {type: Boolean, required: true},
		groupId: {type: String, ref: "Group"},
		createdBy: {type: String, ref: "profile"},
		repeat: {type: String, enum: ["NEVER", "DAILY", "WEEKLY", "MONTHLY", "YEARLY"], default: "NEVER"},
		users: [
			{
				id: {type: String, ref: "Profile"},
				paid: {type: Number}, // should add up to amount
				owes: {type: Number}, // should add up to amount
			},
		],
		category: {
			// we will filter using these
			type: String,
			enum: [
				"movies",
				"sports",
				"groceries",
				"dine_out",
				"liquor",
				"rent",
				"household_supplies",
				"furniture",
				"maintenance",
				"pets",
				"electronics",
				"clothing",
				"gifts",
				"medical",
				"education",
				"parking",
				"bus_train",
				"fuel",
				"cab",
				"flights",
				"hotel",
				"cleaning",
			],
			default: "other",
			required: true,
		},
	},
	{timestamps: true}
);

var expenseModel = mongoose.model("Expense", ExpenseSchema);
module.exports = {
	expenseModel,
};
