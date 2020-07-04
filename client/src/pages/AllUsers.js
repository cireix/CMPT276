import React from 'react';
import axios from 'commons/axios';


const AllUsers = (props) => {

    // get a list of data of all users
    const getData = async () => {
        return await axios.get('/db/users');
    }

    const headers = ['id', 'nickname', 'phone number', 'password', 'type'];

    const data = getData();

    return (
        <div className="allusers">
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        {headers.map(head => <th>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(row => {
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

export default AllUsers;