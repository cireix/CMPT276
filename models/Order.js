const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const OrderSchema = new Schema({
	products: {
		type: Object,
		require: true
	},
	name: {
		type: String,
		require: true
	}, 
	address: {
		type: String,
		require: true
	}, 
	country: {
		type: String,
		require: true
	}, 
    timestamp: {
        type: Number,
        require: true
    },
    phone: {
        type: String,
        require: true
    }
});
module.exports = Order = mongoose.model("order", OrderSchema, 'order');