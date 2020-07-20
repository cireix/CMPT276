import React from 'react';
import axios from 'axios';
import Layout from 'Layout';

class PreviousOrder extends React.Component {

    headers = ['Product Name', 'Quantity', 'Data', 'Price']
    state = {
        order: []
    }

    componentDidMount() {
        axios.post().then(res => {
            this.setState({
                order: res.data.order
            })
        }).catch(err => console.log(err));
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
                                this.state.order.map(row =>
                                    <tr>
                                        {/* <td key={row.productName}>{row.productName}</td>
                                        <td key={row.name}>{row.name}</td>
                                        <td key={row.phone}>{row.phone}</td>
                                        <td key={row.type}>{row.type === 1 ?"Admin" : [row.type === 2 ? "Driver":"General User"]}</td> */}
                                    </tr>
                                
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