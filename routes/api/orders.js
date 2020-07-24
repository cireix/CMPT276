const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const User = require("../../models/User");
var stripe = require('stripe')('sk_test_51H6m1cIWCPZAHnFy1Q65wxXU51FefPYrmKDc2DFMVyOSSE7dgQICtihQx1p41CVAKWEHd9qq2tZ9FhLA01BrD3d900RwktcsJX');
const accountSid = process.env.TWILSid;
const authToken = process.env.TWILAuth;
const twil = require("twilio")(accountSid, authToken);
require("dotenv").config();


function generateCode() {
	return Math.floor(Math.random() * Math.floor(1000000));
}

router.post("/checkout", (req, res) => {
    Order.findOne({ stripeToken: req.body.stripeToken }).then(order => {
		if (order) {
			return res.status(400).json({ message: "Order already exists" });
		} else {
            stripe.tokens.retrieve(
                req.body.stripeToken,
                function(err, token) {
                    if (!err) {

                        var codes = [];
                        Order.find({"phone":req.body.phone}).then(orders => {
                            codes.push(orders.verification);
                        })
                        var verification = generateCode();
                        while (codes.includes(verification)){
                            verification = generateCode();
                        }
                        const newOrder = new Order({
                            products: req.body.products,
                            phone: req.body.phone,
                            name: req.body.name,
                            address: req.body.address,
                            latLng: req.body.latLng,
                            timestamp: token.created,
                            stripeToken: req.body.stripeToken,
                            status: 0,
                            verification: verification
                        });
                        newOrder.save()
                        res.json({message: "Order placed."})
                    }else{
                        return res.status(404).json({ message: "Have not paid for order. Cannot add to DB" });
                    }
                }
            );
		}
	});
});
router.post("/getOrders", (req, res) => {
    Order.find({"status":0}).then(order => {
        res.json(order)
	});
});

router.post("/getPrevious",(req,res) => {
    Order.find({"phone":req.body.phone,"status":2}).then(order => {
        res.json(order)
    })
})

router.post("/getOngoing",(req,res) => {
    Order.find({ $or: [{"status":0},{"status":1}],"phone":req.body.phone }).then(order => {
        res.json(order)
    })
})
router.post("/acceptOrder",(req,res) => {
    Order.findOne({"stripeToken":req.body.stripeToken}).then(order => {
        if(order.status !== 0) {
            res.status(400).json({message: "Order has already been accepted"})
            return;
        }
        Order.updateOne({"stripeToken":req.body.stripeToken},{"status":1}).then(resp => {
            twil.messages.create({
				to: req.body.phone,
				from: "+16042391939",
				body: 'Your order is on its way!\nReply with ' + order.verification + ' when you have received your order!'
			})
            //Send SMS to client
            res.json({message:"Accepted"})

        })
    })
})
router.post("/sms", (req, res) => {
	var msg = req.body.Body.toLowerCase();
    var num = req.body.From;
    try{
        msg = Number.parseInt(msg);
        console.log(msg);
    }catch (error) {
        console.log("Input error")
        twil.messages.create({
            to: num,
            from: "+16042391939",
            body: 'You have entered an invalid input.'
        })
        res.status(400).json({message:"Invalid input"});
        return
    }
    Order.findOne({"phone":num,"verification":msg}).then(order => {
        //fix
        if(!order) {
            console.log("no order found")
            twil.messages.create({
                to: num,
                from: "+16042391939",
                body: 'You have entered an invalid verification code.'
            })
            res.status(400).json({message:"Order is not found"});
            return
        }
        Order.updateOne({"phone":num,"verification":msg},{"status":2}).then(resp => {
            console.log("nice")
            twil.messages.create({
				to: num,
				from: "+16042391939",
				body: 'Thank you!'
			})
            //Send Thank you SMS to client
            res.json({message:"Finished"})
        })
    })
	console.log(msg,num)
})

module.exports = router;