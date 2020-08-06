// import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import { ToastContainer } from 'react-toastify';
import Adaptor from 'enzyme-adapter-react-16';
import React from 'react';
import Enzyme from 'enzyme';
import Router from '../Router';
import store from '../store';
import 'mutationobserver-shim';

Enzyme.configure({ adapter: new Adaptor() });

describe('app main entry', () => {

  test(`default route page`, () => {
    const wrapper = mount(<Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>);

    expect(wrapper.find('.login_wrapper .control button').text()).toContain('Login');
  });
});
