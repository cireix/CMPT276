import React from 'react';
import App from '../pages/App.js';
import { shallow } from 'enzyme';


describe('test app', () => {
  test('test app', () => {
    const wrapper = shallow(<App/>);
  });
});
