import React from "react";
import Enzyme, { shallow, mount,render } from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "mutationobserver-shim";
import Forgotpw from '../pages/ForgotPw'
import { forgotpw,forgotpw2 } from "../service/service";
import axios from "axios";
jest.mock("axios");

Enzyme.configure({ adapter: new EnzymeAadpter() });

const setup = (props = {}) => {
  return render(
    <BrowserRouter>
      <Forgotpw {...props} />
    </BrowserRouter>
  );
};
const wrapper = setup();

describe("render ForgetPw component", () => {
  test("reder without error", () => {
    const component = wrapper.find(".login_wrapper");
    expect(component.length).toBe(1);
  });

  test("test forgotpw api", async () => {

    axios.post.mockResolvedValue({ data: { code: -1 } });
    let result = await forgotpw();
    expect(result.data).toEqual({ code: -1 });
  });

  test("test forgotpw2 api", async () => {

    axios.post.mockResolvedValue({ data: { code: -1 } });
    let result = await forgotpw2();
    expect(result.data).toEqual({ code: -1 });
  });

  test('the submit button is disabled until the first button is clicked', () => {
    const setup = (props={}) => {
      return shallow(<Forgotpw {...props}/>)
    };
    const wrapper = setup();

    const getAuthCodeButton = wrapper.find('button').at(0);
    getAuthCodeButton.simulate('click');
    const submitButton = wrapper.find('button').at(1);
    expect(submitButton.props().disabled).toBe('disabled');
  })
});
