import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAadpter from 'enzyme-adapter-react-16';
import App from '../pages/App';
import { getUser } from '../globalFunc/auth';

Enzyme.configure({ adapter: new EnzymeAadpter() });

const setup = (props={}) => {
  return shallow(<App {...props}/>);
}

const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`);
}

test('render app', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'app-wrapper');
  expect(component.length).toBe(1);
})
