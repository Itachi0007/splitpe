const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
	{
		amount: {type: Number},
		razorpay: {
			orderId: {type: String},
			paymentId: {type: String},
			signature: {type: String},
		},
	},
	{timestamps: true}
);

var transactionModel = mongoose.model("Transaction", TransactionSchema);
module.exports = {
	transactionModel,
};
