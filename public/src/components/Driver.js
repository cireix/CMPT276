import React, { Component } from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper } from 'google-maps-react'; 
// import {toast} from 'react-toastify';
import GoogleMaps from "./GoogleMaps";
import 'css/driver.scss';
import OrderCard from "./OrderCard";

class Driver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: [],
            orders: [],
            zoom: 12,
            latLng: {
                lat: 49.2027, lng: -122.9207
            },
        }
    }
    updateLatLng = d => {
        this.setState({
            latLng: d
        })
        console.log(d);
    }
    updateZoom = () => {
        this.setState({
            zoom:18
        })
    }
    async componentDidMount() {
        const res = await axios.post('api/orders/getOrders', {}).then(resp => {
            this.setState({
                orders: resp.data
            })
            for(var x in this.state.orders) {
                this.state.points.push(this.state.orders[x].latLng)
            }
            console.log(this.state.orders)
            console.log(this.state.points);
        })
    }
    render() {
        return (
           <div class="driverMain">
               <div class="orderList">
                   orderList
                {this.state.orders.map((data,idx)=>{
                    return(
                        // <div>{data.phone}</div>
                        <OrderCard address={data.address} 
                            latLng={data.latLng}
                            updateLatLng={this.updateLatLng}
                            updateZoom={this.updateZoom}

                        />
                    )
                })}
               </div>
               
               <GoogleMaps points={this.state.points} zoom={this.state.zoom} latLng={this.state.latLng}/>
           </div>           
        )
    }
}

export default Driver;