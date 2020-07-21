const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
var stripe = require('stripe')('sk_test_51H6m1cIWCPZAHnFy1Q65wxXU51FefPYrmKDc2DFMVyOSSE7dgQICtihQx1p41CVAKWEHd9qq2tZ9FhLA01BrD3d900RwktcsJX');



router.post("/checkout", (req, res) => {
    Order.findOne({ stripeToken: req.body.stripeToken }).then(order => {
		if (order) {
			return res.status(400).json({ message: "Order already exists" });
		} else {
            stripe.tokens.retrieve(
                req.body.stripeToken,
                function(err, token) {
                    if (!err) {
                        const newOrder = new Order({
                            products: req.body.products,
                            phone: req.body.phone,
                            name: req.body.name,
                            address: req.body.address,
                            latLng: req.body.latLng,
                            timestamp: token.created,
                            stripeToken: req.body.stripeToken,
                            complete: false
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
    Order.find({"complete":false}).then(order => {
        // console.log(order)
        res.json(order)
	});
});

router.post("/getPrevious",(req,res) => {
    Order.find({"phone":req.body.phone,"complete":true}).then(order => {
        res.json(order)
    })
})

router.post("/getOngoing",(req,res) => {
    Order.find({"phone":req.body.phone,"complete":false}).then(order => {
        res.json(order)
    })
})

module.exports = router;