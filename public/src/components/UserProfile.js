import React from 'react'
import '../css/userprofile.scss';
import { getUser, logOut } from '../globalFunc/auth';
import { logoutUser } from "../service/Socket";
import { getNotifications } from "../service/service";
import OrderInfoPanel from './OrderInfoPanel';
import OrderInfo from './OrderInfo';
import axios from "axios"

export default class UserProfile extends React.Component {
    
    componentDidMount() {
        const user = getUser();
        getNotifications({user:user.phoneNumber}).then((data)=>{
            console.log(data);
        });
    }

    logout = () => {
        const user = getUser();
        logoutUser(user);
        logOut();
        // Since this component doesn't have access to Route, pass the string "logout" to the Header component to reload the page
        
        this.props.close("logout");
    }

    toOrderDetail = (orderDetails) => {
        OrderInfoPanel.open({
            component: OrderInfo,
            details: orderDetails
        })
    }

    render() {
        return (
            <div className="user-profile">
                <p className="title has-text-centered">User Profile</p>
                <fieldset disabled>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" defaultValue={this.props.user.nickname} />
                        </div>
                    </div>
    
                    <div className="field">
                        <label className="label">Phone Number</label>
                        <div className="control">
                            <input className="input" type="text" defaultValue={this.props.user.phoneNumber} />
                        </div>
                    </div>
    
                    <div className="field">
                        <label className="label">Type</label>
                        <div className="control">
                            <input
                            className="input"
                            type="text"
                            defaultValue={
                                this.props.user.type === 1 ? "Admin" :
                                [this.props.user.type === 2 ? "Driver" :
                                "General User"]} />
                        </div>
                    </div>
                </fieldset>
    
                <br />
                <br />
    
    
                    { this.props.user.type === 1 ? (
                        <div className="field is-grouped is-grouped-centered">
                            <div className="control">
                                <button className="button allUser" onClick={() => {this.props.close("allusers");}}>All Users</button>
                            </div>
                            <div className="control">
                                <button className="button is-danger Logout" onClick={this.logout}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <div className="field">
    
                            <div className="control user-control">
                                <button className="button user-button PreviousOrder" onClick={() => {this.props.close("prevorder");}}>Previous Order</button>
                            </div>
                            <br />
                            {this.props.user.type === 0 &&
                                <div className="control user-control">
                                    <button className="button user-button Ongoing" onClick={() => {this.props.close("ongoingorder");}}>Ongoing Order</button><br />
                                </div>
                            }
                            <br />
                            <div className="control user-control">
                                <button className="button is-danger user-button Logout" onClick={this.logout}>Logout</button>
                            </div>
                        </div>
    
                    )}
                    <br />
                    <div className="notifications">
                        <div className="nMessage" onClick={()=>{
                             axios.post('api/orders/getOrder', {orderId: "tok_1H7rXyIWCPZAHnFyjn2q1ydp"}).then(resp => {
                                this.toOrderDetail(resp.data)
                            })    
                            
                        }}>
                            <p class="n-o">1H8EGpIWCPZAHnFyWp1TPC7k</p>
                            <p class="n-m">Your order is on its way!</p>
                            <p class="n-t">2019-06-26 19:10:10</p>
                        </div>
                    </div>
            </div>
        )
    }
}
