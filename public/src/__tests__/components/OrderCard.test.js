import React from "react";
import Enzyme, { render } from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import OrderCard from "../../components/OrderCard.js";

Enzyme.configure({ adapter: new EnzymeAadpter() });


const allOrders = [
  {"_id":"5f282a192f311918e8ca2f81","products":[{"id":"551135","name":"FERNIE - CRAFT COLLECTION CAN","price":22.49,"image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/551135.jpg","quantity":2}],"phone":"+12368870654","address":"Austin, 得克萨斯州美国","latLng":{"lat":30.267153,"lng":-97.7430608},"timestamp":1596467726,"stripeToken":"tok_1HC5NqIWCPZAHnFynWPM01eD","status":0,"verification":212482,"__v":0},
  {"_id":"5f282d0d2fdfd5159863735c","products":[{"id":"837591","name":"33 ACRES OF OCEAN PALE ALE","price":12.29,"image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/837591.jpg","quantity":1}],"phone":"+12368870654","address":"Atlanta, 乔治亚州美国","latLng":{"lat":33.7489954,"lng":-84.3879824},"timestamp":1596468488,"stripeToken":"tok_1HC5a8IWCPZAHnFyexlpkCaz","status":0,"verification":629116,"__v":0},
  {"_id":"5f289b76acc94200044b8575","products":[{"id":"182238","name":"COLUMBIA - KOKANEE CAN","price":37.49,"image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/182238.jpg","quantity":1},{"id":"394536","name":"BITBURGER PREMIUM TALL CAN","price":2.19,"image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/394536.jpg","quantity":2},{"id":"574764","name":"COLLECTIVE ARTS - RANSACK THE UNIVERSE CAN","price":3.09,"image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/574764.jpg","quantity":1}],"phone":"+16044044054","address":"7760 Granville Avenue, 列治文不列颠哥伦比亚省加拿大","latLng":{"lat":49.162307,"lng":-123.140821},"timestamp":1596496754,"stripeToken":"tok_1HCCw2IWCPZAHnFyg1cfWw0W","status":0,"verification":412519,"__v":0},
  {"_id":"5f289d88acc94200044b8576","products":[{"id":"182238","name":"COLUMBIA - KOKANEE CAN","price":37.49,"image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/182238.jpg","quantity":1},{"id":"394536","name":"BITBURGER PREMIUM TALL CAN","price":2.19,"image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/394536.jpg","quantity":2},{"id":"574764","name":"COLLECTIVE ARTS - RANSACK THE UNIVERSE CAN","price":3.09,"image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/574764.jpg","quantity":1}],"phone":"+16044044054","address":"7760 Granville Avenue, 列治文不列颠哥伦比亚省加拿大","latLng":{"lat":49.162307,"lng":-123.140821},"timestamp":1596497284,"stripeToken":"tok_1HCD4aIWCPZAHnFyb8pJsoAh","status":0,"verification":834315,"__v":0}
];

const products = [
  {"id":"551135","name":"FERNIE - CRAFT COLLECTION CAN","price":22.49,"image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/551135.jpg","quantity":2}
];

const wrapper = render(
  <BrowserRouter>
    <OrderCard allOrders={allOrders} products={products}/>
  </BrowserRouter>
);

describe("<OrderCard />", () => {

  it("order card Products list", () => {
    expect(wrapper.find('.pdct-info')).toHaveLength(1);
  });

  it("order card info display", () => {
    expect(wrapper.find('.order-text').find('p').text()).toContain(products[0].name);
    expect(wrapper.find('.order-text').find('p').text()).toContain('$' + products[0].price);
    expect(wrapper.find('.order-text').find('p').text()).toContain(products[0].quantity);
  });
});
