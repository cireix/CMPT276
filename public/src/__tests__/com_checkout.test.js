import React from "react";
import Enzyme, { shallow ,render} from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Checkout from "../components/Checkout";

Enzyme.configure({ adapter: new EnzymeAadpter() });

describe("<Checkout />", () => {
  it("component lengh", () => {
    const wrapper = shallow (
      <BrowserRouter>
        <Checkout bar='baz' products={[]} total={{ totalPrice: 20 }} />
      </BrowserRouter>
    );
    expect(wrapper.length).toEqual(1);
  });

  
  it("component render", () => {
    const wrapper = render (
      <BrowserRouter>
        <Checkout products={[]} total={{ totalPrice:20}}/>
      </BrowserRouter>
    );
    let button = wrapper.find('._button');
    expect(button.html()).toEqual('X');
   
  });

  it("component render", () => {
    const wrapper = render (
      <BrowserRouter>
        <Checkout products={[]} total={{ totalPrice:20}}/>
      </BrowserRouter>
    );
    let total = wrapper.find('.test_strong');
    expect(total.html()).toEqual('20.00');
   
  });


});
