import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ToolBox from "../../components/ToolBox";

Enzyme.configure({ adapter: new EnzymeAadpter() });

const search = jest.fn();
const param = {
  search,
};

const wrapper = mount(
  <BrowserRouter>
    <ToolBox {...param} />
  </BrowserRouter>
);

describe("<ToolBox />", () => {

  it("toolbox render", () => {
    const txt = 'abc';
    const input = wrapper.find('.search-input');
    input.simulate('change', { target: { value: txt } });
    expect(search).toBeCalledTimes(1);
  });
});
