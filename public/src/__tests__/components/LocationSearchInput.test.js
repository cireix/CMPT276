import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LocationSearchInput from "../../components/LocationSearchInput";

Enzyme.configure({ adapter: new EnzymeAadpter() });

const updateAddress = jest.fn();
const updateSelected = jest.fn();
const updateLatLng = jest.fn();

const wrapper = shallow(
  <BrowserRouter>
    <LocationSearchInput update={updateAddress} selectUpdate={updateSelected} latlngUpdate = {updateLatLng} />
  </BrowserRouter>
);

describe("<LocationSearchInput />", () => {

  it("when init LocationSearchInput, no callback called", () => {
    expect(updateAddress).toBeCalledTimes(0);
    expect(updateSelected).toBeCalledTimes(0);
  });
});
