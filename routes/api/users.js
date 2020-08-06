const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
require("dotenv").config();
const accountSid = process.env.TWILSid;
const authToken = process.env.TWILAuth;
const twil = require("twilio")(accountSid, authToken);
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
const Notif = require("../../models/Notifications");
const Order = require("../../models/Order");
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
	const phone = "+1" + req.body.phone;
	User.findOne({ phone: phone }).then(user => {
		if (user && user["verified"]) {
			return res.status(400).json({ message: "Phone number already exists" });
		} else {
			var code = generateCode();
			twil.messages.create({
				to: phone,
				from: "+16042391939",
				body: 'Your verification code is: ' + code
			}).then(message => console.log(message));
			console.log("verification code" + code);
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
						User.deleteOne({ phone: phone }).then(result => {
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
	const phone = "+1" + req.body.phone;
	const code = req.body.code;

	User.findOne({ phone: phone }).then(user => {
			console.log("good1")
			console.log(user["code"]);
			if (code != user["code"]) {
				res.status(400).json({ message: "Verification code is not valid" })
				return
			}
			User.updateOne({ phone: phone }, { verified: true }).then(user2 => {
				jwt.sign(
					{
						nickname: user.name,
						phoneNumber: user.phone,
						type: user.type
					},
					keys.secretOrKey,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						//console.log("done")
						res.status(200).json({
							success: true,
							token: "Bearer " + token
						});
						//console.log(err);
						return;

					}
				)
			}).catch(err => console.log(err));
	});
});

router.post("/forgotpw", (req, res) => {
	const phone = "+1" + req.body.phone;
	console.log(phone);
	User.findOne({ phone }).then(user => {
		if (!user) {
			return res.status(404).json({ message: "Phone number not found" });
		} else {
			var code = generateCode();
			twil.messages.create({
				to: phone,
				from: "+16042391939",
				body: 'Your verification code is: ' + code
			});			
			User.findOneAndUpdate({ phone: phone }, { code: code }, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					// console.log("New auth code: "+code);
					res.send("Sent verification code.");
				}
			});
		}
	})
});

router.post("/forgotpw2", (req, res) => {
	var { phone, code, password } = req.body;
	var phone = "+1" + phone;
	User.findOne({phone}).then(user=>{		
		if(user.code === Number(code)){
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, (err, hash) => {
					if (err) throw err;
					password = hash;
					User.findOneAndUpdate({ phone: phone }, { password: hash }, function (err, result) {
						if (err) {
							console.log(err);
						} else {
							console.log(result);
							res.send("Password reset successfully!")
						}
					});
				})
			})
		}else {
			res.status(400).json({ message: "Verification code is not valid" })
		}
	}).catch(err=>{res.send(err); console.log(err)});
});



router.post("/login", (req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const phone = "+1" + req.body.phone;
	const password = req.body.password;
	// Find user by phone
	User.findOne({ phone }).then(user => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ message: "Phone number not found" });
		}
		// Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				var payload = {
					nickname: user.name,
					phoneNumber: user.phone,
					type: user.type
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
							token: "Bearer " + token
						});
					}
				);

			} else {
				return res
					.status(400)
					.json({ message: "Password incorrect" });
			}
		});
	});
});

router.post("/allUsers", (req, res) => {
	User.find({}).then(users => {
		// Check if user exists
		if (!users) {
			return res.status(404).json({ message: "users not found" });
		} else {
			res.json({ users });
		}
	}).catch(err => console.log(err));
});

router.post("/getNotifications", (req,res)=>{
	Notif.find({"user": req.body.user}).then(notifs => {
		if (!notifs) {
			return res.status(404).json({ message: "notifications not found" });
		} else {
			res.json({ notifs });
		}
	}).catch(err => console.log(err));
})

router.post("/createNotification", (req,res)=>{
	const newNotif = new Notif({
		user: req.body.user,
		message: req.body.message,
		timestamp: new Date(),
		orderId: req.body.orderId,
	});
	newNotif.save();
	res.send("Notification created.");
})

router.post("/getCurrent",(req,res)=>{
	User.findOne({"phone": req.body.driver}).then(user => {
		if (!user) {
			return res.status(404).json({ message: "user not found" });
		} else {
			if("currentOrder" in user) {
				Order.findOne({"stripeToken":user.currentOrder}).then(order => {
					if(!order){ res.json({})}
					res.json(order);
				})
			}else{
				res.json({})
			}
		}
	}).catch(err => console.log(err));
});

router.post("/getLocation",(req,res)=>{
	Order.findOne({"stripeToken":req.body.orderId}).then((order)=>{
		if(order.status !== 1) { res.status(404).json({message: "order already finished"})}
		User.findOne({"phone":order.driver}).then((user)=>{
			res.json(user.location)
		})
	})
})

router.post("/updatePos",(req,res)=>{
	User.updateOne({"phone":req.body.driver},{"location":req.body.loc}).then((resp)=>{
		// console.log(resp);
		res.json(req.body.loc)
	})
})





module.exports = router;