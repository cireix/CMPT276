import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import Login from "../pages/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "mutationobserver-shim";
import { login } from "../service/service";
import axios from "axios";
// import moxios from 'moxios';
jest.mock("axios");

Enzyme.configure({ adapter: new EnzymeAadpter() });

const setup = (props = {}) => {
  return mount(
    <BrowserRouter>
      <Login {...props} />
    </BrowserRouter>
  );
};
const wrapper = setup();

describe("render Login component", () => {
  test("reder without error", () => {
    const component = wrapper.find(".login_box");
    // console.log(component.props());
    expect(component.length).toBe(1);
  });

  test("reder login api", async () => {

    axios.post.mockResolvedValue({ data: { code: -1 } });
    let result = await login({phone:"123"});
    expect(result.data).toEqual({ code: -1 });
  });
});

// describe("test loigin api", () => {

// });
