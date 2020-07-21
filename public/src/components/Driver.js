import React, { Component } from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper } from 'google-maps-react'; 
// import {toast} from 'react-toastify';
import GoogleMaps from "./GoogleMaps";
import 'css/driver.scss';

class Driver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: [],
            orders: []
        }
    }
    async componentDidMount() {
        const res = await axios.post('api/orders/getOrders', {}).then(resp => {
            this.setState({
                orders: resp.data
            })
            console.log(this.state.orders)
        })
    }
    render() {
        return (
           <div class="driverMain">
               <div class="orderList">
                   orderList
                {this.state.orders.map((data,idx)=>{
                    return(
                        <div>{data.phone}</div>
                    )
                })}
               </div>
               
               <GoogleMaps points={this.state.points}/>
           </div>
           
        )
    }
}

export default Driver;