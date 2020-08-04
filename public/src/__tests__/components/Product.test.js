import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Product from "../../components/Product";

Enzyme.configure({ adapter: new EnzymeAadpter() });


const product_data = {
  alcoholPercentage: 5.6,
  companyName: "BALDERDASH BREWING ",
  country: "Canada",
  countryCode: "CA",
  desc: "The Weasels’ Den 15-pack is locally brewed, surprisingly tasty and guaranteed to satisfy the sneakiest and thirstiest of craft beer drinkers!↵",
  fullName: "BALDERDASH BREWING - SNEAKY WEASEL CRAFT LAGER",
  image: "http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/20555.jpg",
  price: 17.99,
  productId: "20555",
  productName: " SNEAKY WEASEL CRAFT LAGER",
  rating: 4.1,
  size: 15,
  type: "Domestic - BC Beer",
  volume: 0.355,
  _id: "5d28522e2870460a36f78e98",
};

const wrapper = mount(
  <BrowserRouter>
    <Product product={product_data}/>
  </BrowserRouter>
);

describe("<Product />", () => {

  it("product card render", () => {
    expect(wrapper.find('.img').prop('src')).toBe(product_data.image);
    expect(wrapper.find('.p-name').text()).toBe(product_data.productName);
  });
});
