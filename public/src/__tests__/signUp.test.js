import React from "react";
import Enzyme, { shallow, mount,render } from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "mutationobserver-shim";
import SignUp from '../pages/SignUp'
import { register, register2 } from "../service/service";
import axios from "axios";
jest.mock("axios");

Enzyme.configure({ adapter: new EnzymeAadpter() });

const setup = (props = {}) => {
  return render(
    <BrowserRouter>
      <SignUp {...props} />
    </BrowserRouter>
  );
};
const wrapper = setup();

describe("render SignUp component", () => {
  test("render component", () => {
    const component = wrapper.find(".login_wrapper");
    // console.log(component.props());
    expect(component.length).toBe(1);
  });

  test("test register api", async () => {

    axios.post.mockResolvedValue({ data: { code: -1 } });
    let result = await register();
    expect(result.data).toEqual({ code: -1 });
  });

  test("test register2 api", async () => {

    axios.post.mockResolvedValue({ data: { code: -1 } });
    let result = await register2();
    expect(result.data).toEqual({ code: -1 });
  });
});

// describe("test loigin api", () => {

// });
