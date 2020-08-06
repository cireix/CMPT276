import React from 'react'
import '../css/userprofile.scss';
import { getUser, logOut } from '../globalFunc/auth';
import { logoutUser } from "../service/Socket";
import { getNotifications } from "../service/service";
import OrderInfoPanel from './OrderInfoPanel';
import OrderInfo from './OrderInfo';
import axios from "axios"

export default class UserProfile extends React.Component {
    constructor(){
        super();
        this.state = {
            notifs: []
        }
    }
    componentDidMount() {
        const user = getUser();
        getNotifications({user:user.phoneNumber}).then((data)=>{
            this.setState({
                notifs: data.data.notifs.reverse()
            })
            console.log(data.data.notifs)
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
    parseTime = (d) => {

        const date1 = new Date();
        const date2 = new Date(d);

        var seconds = Math.floor((date1 - (date2))/1000);
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        const days = Math.floor(hours/24);
        
        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

        var output = ""
        if(days) {
            output += days + "d"
        }else if(hours) {
            output += hours + "h"
        }else if(minutes) {
            output += minutes + "m"
        }else{
            output += seconds + "s"
        }
        output += " ago"
        return output
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
                        {this.state.notifs.map((n)=>{
                            return (
                                <div className="nMessage" onClick={()=>{
                                    axios.post('api/orders/getOrder', {orderId: n.orderId}).then(resp => {
                                       this.toOrderDetail(resp.data)
                                   })     
                                }}>
                                   <p class="n-o">{n.orderId.substring(4)}</p>
                                   <p class="n-m">{n.message}</p>
                                   <p class="n-t">{this.parseTime(n.timestamp)}</p>
                               </div>
                            )
                        })}
                        
                    </div>
            </div>
        )
    }
}
