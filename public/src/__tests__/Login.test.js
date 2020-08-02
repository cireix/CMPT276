import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAadpter from 'enzyme-adapter-react-16';
import Login from '../pages/Login';
import moxios from 'moxios';

Enzyme.configure({ adapter: new EnzymeAadpter() });

const setup = (props={}) => {
    return shallow(<Login {...props}/>)
}
const wrapper = setup();
const findByTestAttr = (wrapper, value) => {
    return wrapper.find(`[data-test="${value}"]`);
}


describe('reder without error', () => {
    test('render component', () => {    
        const component = findByTestAttr(wrapper, 'login-wrapper');
        expect(component.length).toBe(1);
    })
});

describe('test axios', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    })

    test('post data to server', () => {
        
    })
})
