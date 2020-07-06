import React, { Component } from 'react';
import axios from 'commons/axios';

class AllUsers extends React.Component {
    headers = ['id', 'nickname', 'phone number', 'password', 'type'];

    state = {
        data : []
    };
    
    componentDidMount() {
        axios.get('/allusers').then(response => {
            this.setState({
                data : response.data
            });
        });
    }

    render() {
        return (
            <div className="allusers">
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            {this.headers.map(head => <th>{head}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(row => {
                                return (<tr>
                                    {
                                        row.map(cell => {
                                            return (
                                                <td>
                                                    { cell === '1' ? "Admin" : 
                                                    [cell === '2' ? "Driver" : 
                                                    [cell === '0' ? "General User" : 
                                                    cell]] }
                                                </td>
                                            )
                                        })
                                    }
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AllUsers;