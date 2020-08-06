const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	type: {
		type: Number,
		required: true
	},
	verified: {
		type: Boolean,
		required: false,
	},
	code: {
		type: Number,
		required: false
	},
	currentOrder: {
		type: String,
		required: false,
	},
	location: {
		type: Object,
		required: false
	}
});
module.exports = User = mongoose.model("users", UserSchema);