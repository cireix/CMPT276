import React from 'react';
import axios from 'axios';
import Layout from 'Layout';

class AllUsers extends React.Component {
    
    headers = ['User Id', 'Name', 'Phone Number', 'Type'];
    state = {
        users: []
        // currentPage: [],
        // numOfFirst: 0,
        // maxPerPage: 20
    };
    
    componentDidMount() {
        axios.post('api/users/allUsers').then(response => {
            this.setState({
                users: response.data.users
            })
        })}
        //     // pagination
        //     var currentPage = [];
        //     for (var num = 0; num < this.state.numOfFirst + this.state.maxPerPage; num ++) {
        //         currentPage.push(response.data.users[num])
        //     }
        //     this.setState({
        //         currentPage: currentPage,
        //         numOfFirst: num
        //     })
        // }).catch((err)=> console.log(err));     

    // }

        // // Go to the next page
        // toNextPage = () => {
        //     var currentPage = [];
        //     var num = this.state.numOfFirst;
        //     for (num; num < this.state.numOfFirst + this.state.maxPerPage; num ++) {
        //         if (num === this.state.users.length) break;
        //         currentPage.push(this.state.users[num]);
        //     }
        //     this.setState({
        //         currentPage: currentPage,
        //         numOfFirst: num
        //     })
        // }
    
        // // Go to the previous page
        // toPervPage = () => {
        //     var currentPage = [];
        //     var num = this.state.numOfFirst - 2 * this.state.maxPerPage
        //     for (num; num < this.state.numOfFirst - this.state.maxPerPage; num ++) {
        //         currentPage.push(this.state.users[num])
        //     }
        //     this.setState({
        //         currentPage: currentPage,
        //         numOfFirst: num
        //     })
        // }

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