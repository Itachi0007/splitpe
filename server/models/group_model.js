const mongoose = require("mongoose");

var groupSchema = new mongoose.Schema(
	{
		name: {type: String},
		members: [{type: String, ref: "Profile"}],
		imageUrl: {type: String, trim: true, default: ""},
		createdBy: {type: String, ref: "Profile"},
	},
	{timestamps: true}
);

var groupModel = mongoose.model("Group", groupSchema);
module.exports = {
	groupModel,
};
