const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
	{
		name: {type: String, required: true},
		type: {type: String, enum: ["breakfast", "lunch", "dinner", "snacks"], default: "dinner"},
		tags: [{type: String, default: ""}], // to be used in searching like baigan etc
		category: {
			type: String,
			enum: ["appetizer", "main_course", "dessert", "sweet"],
			default: "main_course",
			required: true,
		},
		description: {type: String},
		amount: {type: Number, required: true},
		isGroup: {type: Boolean, required: true, default: false},
		groupId: {type: String, ref: "Group"},
		createdBy: {type: String, ref: "profile"},
	},
	{timestamps: true}
);

var expenseModel = mongoose.model("Expense", ExpenseSchema);
module.exports = {
	expenseModel,
};
