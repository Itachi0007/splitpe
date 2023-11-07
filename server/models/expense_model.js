const mongoose = require("mongoose");
const mongooseCurrency = require("mongoose-currency");

const ExpenseSchema = new mongoose.Schema(
	{
		description: {type: String, required: true},
		category: {
			type: String,
			enum: ["entertainment", "dining", "home", "transport", "services", "other"],
			default: "other",
			required: true,
		}, // we will filter using these
		amount: {type: Number, required: true}, // all payer shared sum must be equal to amount
		currency: {type: mongooseCurrency.Currency},
		isGroup: {type: Boolean, required: true, default: false},
		groupId: {type: String, ref: "Group"},
		createdBy: {type: String, ref: "profile"},
		payers: [
			{
				user: {type: String, ref: "Profile"},
				share: {type: Number}, // should add up to amount
			},
		],
		payees: [
			{
				user: {type: String, ref: "Profile"},
				share: {type: Number},
			},
		],
		type: {
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
				"plane",
				"hotel",
				"cleaning",
			],
			default: "dinner",
		},
	},
	{timestamps: true}
);

var expenseModel = mongoose.model("Expense", ExpenseSchema);
module.exports = {
	expenseModel,
};
