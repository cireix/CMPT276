import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAadpter from 'enzyme-adapter-react-16';
import AllUsers from '../pages/AllUsers';
import moxios from 'moxios';

Enzyme.configure({ adapter: new EnzymeAadpter() });

const setup = (props={}) => {
    return shallow(<AllUsers {...props}/>)
}
const wrapper = setup();
const findByTestAttr = (wrapper, value) => {
    return wrapper.find(`[data-test="${value}"]`);
}

describe('render without error', () => {
    test('render component', () => {
        const component = findByTestAttr(wrapper, 'allusers');
        expect(component.length).toBe(1);
    });
    test('render table head', () => {
        const headers = ['User Id', 'Name', 'Phone Number', 'Type'];
        const thead = findByTestAttr(wrapper, 'thead');
        expect(thead.length).toBe(headers.length);
    });
    test('get user data from server', () => {
        moxios.install();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [
                    { id: 1, firstName: 'Fred', lastName: 'Flintstone' },
                    { id: 2, firstName: 'Wilma', lastName: 'Flintstone' }
                  ]
            })
                .then(() => {
                    const tbody = findByTestAttr(wrapper, 'tbody');
                    expect(tbody.length).toBe(2);
                })
        })
        moxios.uninstall();
    })
})
