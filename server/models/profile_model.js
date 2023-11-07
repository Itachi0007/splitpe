const mongoose = require("mongoose");

var profileSchema = new mongoose.Schema(
	{
		name: {type: String},
		phone: {type: String, default: "", required: true},
		email: {type: String, required: true},
		password: {type: String, required: true, min: 6},
		imageUrl: {
			type: String,
			trim: true,
			default:
				"https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg?w=768",
		},
		myGroups: [{type: String, ref: "Group"}],
		myFriends: [{type: String, ref: "Profile"}], // need to make a friend if sharing an expense
	},
	{timestamps: true}
);

var profileModel = mongoose.model("Profile", profileSchema);
module.exports = {
	profileModel,
};
