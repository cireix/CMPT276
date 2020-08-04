import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Driver from "../../components/Driver";

Enzyme.configure({ adapter: new EnzymeAadpter() });

const wrapper = mount(
  <BrowserRouter>
    <Driver/>
  </BrowserRouter>
);

describe("<Driver />", () => {

  it("no order, no OrderCard test", () => {
    expect(wrapper.find('.orderCard')).toHaveLength(0);
  });
});
