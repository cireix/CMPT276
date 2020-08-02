import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAadpter from 'enzyme-adapter-react-16';
import OngoingOrder from '../pages/OngoingOrder';
import moxios from 'moxios';
import { getUser } from '../globalFunc/auth';

Enzyme.configure({ adapter: new EnzymeAadpter() });

const setup = (props={}) => {
    return shallow(<OngoingOrder {...props}/>)
}
const wrapper = setup();
const findByTestAttr = (wrapper, value) => {
    return wrapper.find(`[data-test="${value}"]`);
}

test('render component', () => {
    const component = findByTestAttr(wrapper, 'ongoing');
    expect(component.length).toBe(1);
});

test('render table', () => {
    const data = findByTestAttr(wrapper, 'ongoing-data');
    expect(data.length).toBe(wrapper.state().order.length);
})

describe('test axios', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    })

    test('get data from the server', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [
                    { name: "beer", quantity: 2, price: 23 },
                    { name: "wine", quantity: 3, price: 45 },
                  ]
            })
                .then(() => {
                    expect(wrapper.state().order.length).toBe(2);
                })
        })
    })
})