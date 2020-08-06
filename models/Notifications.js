const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const NotifSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
	message: {
		type: String,
		required: true
	},
	timestamp: {
		type: String,
		required: true
    },
    orderId: {
        type: String,
        required: true
    }
});
module.exports = Notifications = mongoose.model("notifications", NotifSchema);