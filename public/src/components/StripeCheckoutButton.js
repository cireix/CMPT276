import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
const axios = require("axios");

const StripeCheckoutButton = ({ user, price, products, disabled }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51H6m1cIWCPZAHnFyPL64e93LGguHVGL4h4F7LxFn5vRzDUpDggtz5cJSX2VwfprNWspvhqZq1fMFzH3SKN28l4V500sgaYh6Jq';

  const onToken = async token => {
    console.log(products,user,token);
    const res = await axios.post('api/orders/checkout', { 
      products: products,
      phone: user.phoneNumber, 
      name: user.nickName,
      address: token.card.address_line1,
      city: token.card.address_city,
      country: token.card.address_country,
      timeStamp: token.created,
      stripeToken: token.id
    });
    console.log(res.data)

  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='BC Liquor Store'
      billingAddress
      shippingAddress
      currency="CAD"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    >
      <button disabled={disabled}>
        Pay Now
      </button>
    </StripeCheckout>
  );
};

export default StripeCheckoutButton;