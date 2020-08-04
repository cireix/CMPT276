import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserProfile from "../../components/UserProfile";

Enzyme.configure({ adapter: new EnzymeAadpter() });


describe("<UserProfile />", () => {

  it("UserProfile admin type render", () => {
    const prop = {
      user: {
        type: 1,
        nickname: 'lucy',
        phoneNumber: 1893458223,
      }
    };
    const wrapper = mount(
      <BrowserRouter>
        <UserProfile {...prop}/>
      </BrowserRouter>
    );

    wrapper.find('input').forEach((inpt, i) => {
      if (i === 0) {
        expect(inpt.getDOMNode().getAttribute('value')).toBe(prop.user.nickname);
      } else if (i === 1) {
        expect(inpt.getDOMNode().getAttribute('value')).toBe(String(prop.user.phoneNumber));
      } else {
        expect(inpt.getDOMNode().getAttribute('value')).toBe('Admin');
      }
    });
  });

  it("UserProfile Driver type render", () => {

    const prop = {
      user: {
        type: 2,
        nickname: 'lucy',
        phoneNumber: 1893458223,
      }
    };
    const wrapper = mount(
      <BrowserRouter>
        <UserProfile {...prop}/>
      </BrowserRouter>
    );

    wrapper.find('input').forEach((inpt, i) => {
      if (i === 0) {
        expect(inpt.getDOMNode().getAttribute('value')).toBe(prop.user.nickname);
      } else if (i === 1) {
        expect(inpt.getDOMNode().getAttribute('value')).toBe(String(prop.user.phoneNumber));
      } else {
        expect(inpt.getDOMNode().getAttribute('value')).toBe('Driver');
      }
    });
  });

  it("General User type render", () => {

    const prop = {
      user: {
        type: 3,
        nickname: 'lucy',
        phoneNumber: 1893458223,
      }
    };
    const wrapper = mount(
      <BrowserRouter>
        <UserProfile {...prop}/>
      </BrowserRouter>
    );

    wrapper.find('input').forEach((inpt, i) => {
      if (i === 0) {
        expect(inpt.getDOMNode().getAttribute('value')).toBe(prop.user.nickname);
      } else if (i === 1) {
        expect(inpt.getDOMNode().getAttribute('value')).toBe(String(prop.user.phoneNumber));
      } else {
        expect(inpt.getDOMNode().getAttribute('value')).toBe('General User');
      }
    });
  });

  it("Previous Order type render", () => {
    const close = jest.fn();

    const prop = {
      close,
      user: {
        type: 3,
        nickname: 'lucy',
        phoneNumber: 1893458223,
      }
    };

    const wrapper = mount(
      <BrowserRouter>
        <UserProfile {...prop}/>
      </BrowserRouter>
    );

    const button = wrapper.find('.PreviousOrder');
    button.simulate('click');
    expect(close).toBeCalledTimes(1);

    const Logout = wrapper.find('.Logout');
    Logout.simulate('click');
    expect(close).toBeCalledTimes(2);
  });

  it("all user event test", () => {
    const close = jest.fn();

    const prop = {
      close,
      user: {
        type: 1,
        nickname: 'lucy',
        phoneNumber: 1893458223,
      }
    };

    const wrapper = mount(
      <BrowserRouter>
        <UserProfile {...prop}/>
      </BrowserRouter>
    );

    const button = wrapper.find('.allUser');
    button.simulate('click');
    expect(close).toBeCalledTimes(1);

    const Logout = wrapper.find('.Logout');
    Logout.simulate('click');
    expect(close).toBeCalledTimes(2);
  });

  it("Ongoing event test", () => {
    const close = jest.fn();

    const prop = {
      close,
      user: {
        type: 0,
        nickname: 'lucy',
        phoneNumber: 1893458223,
      }
    };

    const wrapper = mount(
      <BrowserRouter>
        <UserProfile {...prop}/>
      </BrowserRouter>
    );

    const button = wrapper.find('.Ongoing');
    button.simulate('click');
    expect(close).toBeCalledTimes(1);
  });
});
