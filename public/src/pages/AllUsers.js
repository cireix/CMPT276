import React from 'react';
import axios from 'axios';
import Layout from 'Layout';

class AllUsers extends React.Component {
    
    headers = ['User Id', 'Name', 'Phone Number', 'Type'];
    state = {
        users: []
    };
    
    componentDidMount() {
        axios.post('api/users/allUsers').then(response => {
            this.setState({
                users: response.data.users
            })
        })}

    render() {
        return (
            <Layout>
                <div className="allusers">
                    <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                {this.headers.map(head => <th>{head}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(row =>
                                    <tr>
                                        <td key={row._id}>{row._id}</td>
                                        <td key={row.name}>{row.name}</td>
                                        <td key={row.phone}>{row.phone}</td>
                                        <td key={row.type}>{row.type === 1 ?"Admin" : [row.type === 2 ? "Driver":"General User"]}</td>
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

export default AllUsers;