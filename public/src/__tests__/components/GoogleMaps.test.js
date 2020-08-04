import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAadpter from "enzyme-adapter-react-16";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GoogleMaps from "../../components/GoogleMaps";

Enzyme.configure({ adapter: new EnzymeAadpter() });

const points = [{"lat":30.267153,"lng":-97.7430608},{"lat":33.7489954,"lng":-84.3879824},{"lat":49.162307,"lng":-123.140821},{"lat":49.162307,"lng":-123.140821}];
const zoom = 12;
const latLng = {"lat":49.2027,"lng":-123.1007};
const bounds = null;
const current = {"lat":30.560854099999997,"lng":104.0769138};

const wrapper = mount(
  <BrowserRouter>
    <GoogleMaps
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUutEZ3A0Nn-d2-j66fj7OeY7LLVGP-Wo"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={ <div style={{ height: 'calc(100vh - 45px)', width: '100%' }} /> }
      mapElement={ <div style={{ height: `100%` }} />}
      points={points} zoom={zoom} latLng={latLng} bounds={bounds} current={current}/>
  </BrowserRouter>
);

describe("<GoogleMaps />", () => {

  it("maps location render test", () => {
    expect(wrapper.html()).toContain("div");
    expect(wrapper.find('div').text()).toBe('')
  });
});
