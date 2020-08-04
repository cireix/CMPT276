import React from "react";
import Enzyme, { shallow, mount ,render} from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AllUsers from '../pages/AllUsers'
import "mutationobserver-shim";
import { getAllUsers } from "../service/service";
import axios from "axios";
// import moxios from 'moxios';
jest.mock("axios");

Enzyme.configure({ adapter: new EnzymeAadpter() });

const setup = (props = {}) => {
  return render( 
    <BrowserRouter>
      <AllUsers></AllUsers>
    </BrowserRouter>
  );
};
const wrapper = setup();

describe("render getAllUsers component", () => {
  test("render component", () => {
    const component = wrapper.find(".allusers table thead");
    // const component2 = wrapper.find('.allusers')
    
    // console.log(component2.html());
 
    expect(component.text()).toBe("User IdNamePhone NumberType");
  });

  test("test getAllUsers api", async () => {
   
    axios.post.mockResolvedValue({ data: { code: -1 } });
    let result = await getAllUsers();
    expect(result.data).toEqual({ code: -1 });
  });
});

// describe("test loigin api", () => {

// });
