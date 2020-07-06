const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
require("dotenv").config();
const accountSid = process.env.TWILSid;
const authToken = process.env.TWILAuth;
const twil = require("twilio")(accountSid,authToken);
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

function generateCode() {
	return Math.floor(Math.random() * Math.floor(1000000));
}

// const createToken = (payload) => {
//     return jwt.sign(payload, SECRET, { expiresIn })
// }

router.post("/register", (req, res) => {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const phone = "+1"+req.body.phone;
	User.findOne({ phone: phone }).then(user => {
		if (user && user["verified"]) {
			return res.status(400).json({ phone: "Phone number already exists" });
		} else {
			var code = generateCode();
			twil.messages.create({
				to: phone,
				from: "+16042391939",
				body: 'Your verification code is: ' + code 
			}).then(message => console.log(message));
			const newUser = new User({
				name: req.body.name,
				phone: phone,
				password: req.body.password,
				type: 0,
				verified: false,
				code: code
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					if (user) {
						User.deleteOne({phone:phone}).then(result=> {
							console.log(result);
						}); //If not verified and user is valid, replace
					}
					newUser.save()
				})
			});
			
			res.send("Sent verification code.");
			console.log(newUser)
		}
	});
});

router.post("/register2", (req, res) => {
	const phone = "+1"+req.body.phone;
	const code = req.body.code;

	User.findOne({ phone: phone }).then(user => {
		if (user) {
			console.log("good1")
			console.log(user["code"]);
			if (code != user["code"]) {
				res.status(400).json({code: "Verification code is not valid"})
				return
			} 
			User.updateOne({phone:phone},{verified: true}).then(user2 => {
				console.log(user)
				jwt.sign(
					{
						nickname: user.name,
						phoneNumber: user.phone,
						type:user.type
					},
				keys.secretOrKey,
				{
					expiresIn: 31556926 // 1 year in seconds
				},
				(err, token) => {
					console.log("done")
					res.status(200).json({
						success: true,
						token: "Bearer "+ token
					});
					console.log(err);
					return;
					
				}
			)})
			.catch(err => console.log(err));
		} else {
			return res.status(400).json({ phone: "Phone number does not exist" });
		}
	});
});



router.post("/login", (req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const phone = req.body.phone;
	const password = req.body.password;
	// Find user by phone
	User.findOne({ phone }).then(user => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ phonenotfound: "Phone number not found" });
		}
		// Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					nickname: user.name,
					phoneNumber: user.phone,
					type:user.type
				};
				//Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer "+ token
						});
					}
				);
	
			} else {
				return res
					.status(400)
					.json({ passwordincorrect: "Password incorrect" });
			}
		});
	});
});
module.exports = router;