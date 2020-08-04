import React from 'react';
import {getPrevious} from '../service/service'
import Layout from '../Layout';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import { getUser } from '../globalFunc/auth';

class PreviousOrder extends React.Component {

    headers = ['Product Name', 'Price', 'Quantity', 'Total']
    state = {
        order: []
    }

    componentDidMount() {
        // Get user's phone number
        const user = getUser();
        const { phoneNumber } = user;
        console.log(phoneNumber);
        // post to server side and get the qrevious order
        getPrevious({ phone: phoneNumber }).then(res => {
            this.setState({
                order: res.data
            })
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <Layout>
                <div className="allorders">
                            {
                                this.state.order.length > 0 ? (
                                    this.state.order.map(order => {
                                        return (
                                            <Accordion defaultActiveKey="0">
                                                <Card>
                                                    <Card.Header>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                            Previous Order
                                                        </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey="0">
                                                        <Card.Body variant="link">
                                                            <table className="table is-fullwidth">
                                                                <thead>
                                                                    <tr>
                                                                        {this.headers.map(head => <th>{head}</th>)}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        order.products.map(product => {
                                                                            return (
                                                                                <tr>
                                                                                    <td key={product.name}>{product.name}</td>
                                                                                    <td key={product.price}>{product.price}</td>
                                                                                    <td key={product.quantity}>{product.quantity}</td>
                                                                                    <td key={parseFloat(product.price) * parseInt(product.quantity)}>{parseFloat(product.price) * parseInt(product.quantity)}</td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            </Accordion>
                                        )
                                    })
                                ) : (
                                    <div>
                                        <p className="title has-text-centered">No Previous Order</p>
                                    </div>
                                )
                            }

                </div>

            </Layout>
        )
    }
}


export default PreviousOrder;
