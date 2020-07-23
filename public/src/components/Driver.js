import React, { Component } from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper } from 'google-maps-react'; 
// import {toast} from 'react-toastify';
import GoogleMaps from "./GoogleMaps";
import OrderCard from "./OrderCard";
import 'css/driver.scss';


class Driver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: [],
            orders: [],
            zoom: 12,
            latLng: {
                lat: 49.2027, lng: -123.1007
            },
            bounds: null,
            current: null
        }
        this.getCurrentLoc();
    }
    getCurrentLoc = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.setState({
              current: pos
            })
          });
        }
    }
    updateLatLng = d => {
        this.setState({
            latLng: d
        })
    }
    updateZoom = () => {
        this.setState({
            zoom:18
        })
    }
    updateBounds = (a) =>  {
        this.setState({
            bounds: [a,this.state.current] 
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
        })
    }
    render() {
        return (
           <div class="driverMain">
               <div class="orderList">
                   <p className="title has-text-centered">Order List</p>
                {this.state.orders.map((data,idx)=>{
                    return(
                        // <div>{data.phone}</div>
                        <OrderCard address={data.address} 
                            latLng={data.latLng}
                            phone={data.phone}
                            stripeToken={data.stripeToken}
                            updateLatLng={this.updateLatLng}
                            updateZoom={this.updateZoom}
                            updateBounds={this.updateBounds}
                            products={data.products}
                            current={this.state.current}
                        />
                    )
                })}
               </div>
               
                <GoogleMaps ref="theMap"
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUutEZ3A0Nn-d2-j66fj7OeY7LLVGP-Wo"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={ <div style={{ height: 'calc(100vh - 45px)', width: '100%' }} /> }
                    mapElement={ <div style={{ height: `100%` }} />}
                    points={this.state.points} 
                    zoom={this.state.zoom} 
                    latLng={this.state.latLng} 
                    bounds={this.state.bounds}
                    current={this.state.current}
                />
           </div>           
        )
    }
}

export default Driver;