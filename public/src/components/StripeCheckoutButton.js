import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { withRouter } from 'react-router-dom';
const axios = require("axios");

const StripeCheckoutButton = ({ user, price, products, disabled, address, latLng,history }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51H6m1cIWCPZAHnFyPL64e93LGguHVGL4h4F7LxFn5vRzDUpDggtz5cJSX2VwfprNWspvhqZq1fMFzH3SKN28l4V500sgaYh6Jq';

  const onToken = async token => {
    console.log(latLng);
    const res = await axios.post('api/orders/checkout', { 
      products: products,
      phone: user.phoneNumber, 
      name: user.nickName,
      address: address,
      timeStamp: token.created,
      latLng: latLng,
      stripeToken: token.id
    });
    if(res) {
      history.push('/thankyou');
    }
    console.log(res.data);

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
      <button class="btn btn-primary" disabled={disabled}>
        Pay Now
      </button>
    </StripeCheckout>
  );
};

export default withRouter(StripeCheckoutButton);