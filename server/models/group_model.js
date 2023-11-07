const mongoose = require("mongoose");
const mongooseCurrency = require("mongoose-currency");

var groupSchema = new mongoose.Schema(
	{
		name: {type: String},
		members: [{type: String, ref: "Profile"}],
		imageUrl: {type: String, trim: true, default: ""},
		createdBy: {type: String, ref: "Profile"},
		currency: {type: mongooseCurrency.Currency}, // default currency to be used in the group
	},
	{timestamps: true}
);

var groupModel = mongoose.model("Group", groupSchema);
module.exports = {
	groupModel,
};
