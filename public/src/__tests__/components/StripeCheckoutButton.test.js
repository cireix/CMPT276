import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StripeCheckoutButton from "../../components/StripeCheckoutButton";

Enzyme.configure({ adapter: new EnzymeAadpter() });

const prop = {
  price: '19.99',
};

const wrapper = mount(
  <BrowserRouter>
    <StripeCheckoutButton {...prop}/>
  </BrowserRouter>
);

describe("<StripeCheckoutButton />", () => {

  it("test pay button render", () => {
    expect(wrapper.html()).toBe("<span><button class=\"btn btn-primary\">Pay Now</button></span>")
  });


  it("test pay button render", () => {
    expect(wrapper.html()).toBe("<span><button class=\"btn btn-primary\">Pay Now</button></span>")
  });
});
