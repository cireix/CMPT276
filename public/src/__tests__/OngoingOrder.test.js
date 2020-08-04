import React from "react";
import Enzyme, { shallow, mount ,render} from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "mutationobserver-shim";
import OngoingOrder from '../pages/OngoingOrder'
import { getOngoing } from "../service/service";
import axios from "axios";
jest.mock("axios");

Enzyme.configure({ adapter: new EnzymeAadpter() });

const setup = (props = {}) => {
  return render(
    <BrowserRouter>
      <OngoingOrder {...props} />
    </BrowserRouter>
  ); 
};
const wrapper = setup();

describe("render OngoingOrder component", () => {
  test("render component", () => {
    const component = wrapper.find(".allorders");
    // console.log(component.props());
    // console.log(component.html(), "++++++");
    expect(component.length).toBe(1);
  });

  test("test getOngoing api", async () => {
   
    axios.post.mockResolvedValue({ data: { code: -1 } });
    let result = await getOngoing();
    expect(result.data).toEqual({ code: -1 });
  });
});

// describe("test loigin api", () => {

// });
