const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
var stripe = require('stripe')('sk_test_51H6m1cIWCPZAHnFy1Q65wxXU51FefPYrmKDc2DFMVyOSSE7dgQICtihQx1p41CVAKWEHd9qq2tZ9FhLA01BrD3d900RwktcsJX');



router.post("/checkout", (req, res) => {
    stripe.tokens.retrieve(
        req.body.stripeToken,
        function(err, token) {
            if (!err) {
                const newOrder = new Order({
                    products: req.body.products,
                    phone: req.body.phone,
                    name: req.body.name,
                    address: req.body.address,
                    city: req.body.city,
                    country: req.body.country,
                    timestamp: token.created,
                    stripeToken: req.body.stripeToken
                });
                newOrder.save()
                res.json({message: "Order placed."})
            }else{
                return res.status(404).json({ message: "Have not paid for order. Cannot add to DB" });
            }
        }
      );

   

});
module.exports = router;