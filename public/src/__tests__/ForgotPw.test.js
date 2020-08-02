import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAadpter from 'enzyme-adapter-react-16';
import ForgotPw from '../pages/ForgotPw';
import moxios from 'moxios';

Enzyme.configure({ adapter: new EnzymeAadpter() });

const setup = (props={}) => {
    return shallow(<ForgotPw {...props}/>)
}
const wrapper = setup();
const findByTestAttr = (wrapper, value) => {
    return wrapper.find(`[data-test="${value}"]`);
}

test('render without error', () => {
    const component = findByTestAttr(wrapper, 'forgotpw-wrapper');
    expect(component.length).toBe(1);
})

test('the submit button is disabled until the first button is clicked', () => {
    const getAuthCodeButton = wrapper.find('button').at(0);
    getAuthCodeButton.simulate('click');
    const submitButton = wrapper.find('button').at(1);
    expect(submitButton.props().disabled).toBe('');
})
