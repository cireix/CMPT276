import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Products from "../../components/Products";
import { Provider } from 'react-redux';
import store from '../../store';

Enzyme.configure({ adapter: new EnzymeAadpter() });


const wrapper = mount(
  <Provider store={store}>
    <BrowserRouter>
      <Products/>
    </BrowserRouter>
  </Provider>
);

describe("<Products />", () => {

  it("Products has no state, should be empty", () => {
    expect(wrapper.find('.is-2')).toEqual({});
  });
});
