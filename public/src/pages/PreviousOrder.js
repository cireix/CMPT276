import React from 'react';
import axios from 'axios';
import Layout from 'Layout';

class PreviousOrder extends React.Component {

    headers = ['Product Name', 'Price', 'Quantity', 'Total']
    state = {
        order: []
    }

    async componentDidMount() {
        // Get user's phone number
        const user = global.auth.getUser();
        const { phoneNumber } = user;
        console.log(phoneNumber);
        // post to server side and get the qrevious order
        await axios.post("api/orders/getPrevious", { phone: phoneNumber }).then(res => {
            this.setState({
                order: res.data[0].products
            })
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <Layout>
                <div className="allorders">
                    <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                {this.headers.map(head => <th>{head}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.order.length > 0 ? (
                                    this.state.order.map(row =>
                                        <tr>
                                            <td key={row.name}>{row.name}</td>
                                            <td key={row.price}>{row.price}</td>
                                            <td key={row.quantity}>{row.quantity}</td>
                                            <td key={parseFloat(row.price) * parseInt(row.quantity)}></td>
                                        </tr>
                                    )
                                ) : (
                                    <div>
                                        <p>No Previous Order</p>
                                    </div>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </Layout>
        )
    }    
}


export default PreviousOrder;