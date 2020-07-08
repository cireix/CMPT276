import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

class AllUsers extends React.Component {
    headers = ['User Id', 'Name', 'Phone Number', 'Type'];
    state = {
        users : []
    };
    
    componentDidMount() {
        axios.get('/api/users/allUsers').then(response => {
            this.setState({
                users : response.data.users
            })}).catch((err)=> console.log(err));     
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
                            this.state.users.map(row =>
                                <tr>
                                    <td>{row._id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.phone}</td>
                                    <td>{row.type === 1 ?"Admin" : [row.type === 2 ? "Driver":"General User"]}</td>
                                </tr>
                            
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AllUsers;