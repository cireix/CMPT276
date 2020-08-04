import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../../components/Header";

Enzyme.configure({ adapter: new EnzymeAadpter() });

describe("<Header />", () => {

  it("after login driver header render", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Header { ...{ user: {type: 2, nickname: 'jack'} }}/>
      </BrowserRouter>
    );

    const button = wrapper.find('.nickname');
    button.simulate('click');

    const button2 = wrapper.find('.far');
    button2.simulate('click');

    expect(wrapper.find('.nickname').text()).toBe("jack");

  });

  it("nickname not exist test", () => {

    const wrapper = mount(
      <BrowserRouter>
        <Header { ...{ user: {type: 2, nickname: null} }}/>
      </BrowserRouter>
    );

    const button = wrapper.find('a[href="/login"]');
    button.simulate('click');

    const button2 = wrapper.find('a[href="/signup"]');
    button2.simulate('click');

    expect(button.text()).toBe('LOGIN');
    expect(button2.text()).toBe('SIGN UP');
  });
});
