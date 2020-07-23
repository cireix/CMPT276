const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const OrderSchema = new Schema({
	products: {
		type: Object,
		require: true
    },
    phone: {
        type: String,
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
    latLng: {
        type: Object,
        require: true
    },
    timestamp: {
        type: Number,
        require: true
    },
    stripeToken: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        require: true
    },
    verification: {
        type: Number,
        require: true,
    }
    
    
});
module.exports = Order = mongoose.model("order", OrderSchema, 'order');