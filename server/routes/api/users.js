const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const accountSid = "AC38c4407547e94e98dc36008d6e9f1264";
const authToken = "91f9f13b70b48262469b2c283b3976d5";
const twil = require("twilio")(accountSid,authToken);
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

function generateCode() {
	return Math.floor(Math.random() * Math.floor(1000000));
}

var needVerification = {}


router.post("/register", (req, res) => {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({ phone: req.body.phone }).then(user => {
		if (user) {
			return res.status(400).json({ phone: "Phone number already exists" });
		} else {
			const newUser = new User({
				name: req.body.name,
				phone: req.body.phone,
				password: req.body.password
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
				})
			});
			var code = generateCode();
			twil.messages.create({
				to: req.body.phone,
				from: "+16042391939",
				body: 'Your verification code is: ' + code 
			}).then(message => console.log(message.sid));
			
			needVerification[req.body.phone] = {
				data: newUser,
				code: code
			}
			res.send("Sent verification code.");
			console.log(needVerification)
		}
	});
});

router.post("/register2", (req, res) => {
	// Hash password before saving in database
	const phone = req.body.phone;
	const code = req.body.code;

	if (!phone in needVerification) {
		res.send("Phone not registered.")
		return
	}
	
	if (code != needVerification[phone]["code"]) {
		res.send("Verification code is not valid.")
		return
	}
	const newUser = needVerification[phone]["data"]
	
	newUser
		.save()
		.then(user => res.json(user))
		.catch(err => console.log(err));
	
	
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
					id: user.id,
					name: user.name
				};
				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token
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