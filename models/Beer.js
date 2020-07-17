const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const BeerSchema = new Schema({
	productId: {
		type: String,
		require: true
	},
	alcoholPercentage: {
		type: Number,
		require: true
	}, 
	companyName: {
		type: String,
		require: true
	}, 
	country: {
		type: String,
		require: true
	}, 
	desc: {
		type: String,
		require: true
	}, 
	fullName: {
		type: String,
		require: true
	}, 
	image: {
		type: String,
		require: true
	}, 
	price: {
		type: Number,
		require: true
	}, 
	productName: {
		type: String,
		require: true
	}, 
	rating: {
		type: Number,
		require: true
	}, 
	size: {
		type: Number,
		require: true
	}, 
	type: {
		type: String,
		require: true
	}, 
	volume: {
		type: Number,
		require: true
	}
});
module.exports = Beer = mongoose.model("beer", BeerSchema, 'beer');