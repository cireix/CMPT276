const express = require("express");
const router = express.Router();
const Beer = require("../../models/Beer");


router.post("/products", (req, res) => {
	Beer.find({}).then(beer => {
		// Check if user exists
		if (!beer) {
			return res.status(404).json({ message: "beer not found" });
		} else {
			res.json({ beer });
		}
	}).catch(err => console.log(err));

});
module.exports = router;