import React, { Component } from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper } from 'google-maps-react';
// import {toast} from 'react-toastify';
import GoogleMaps from "./GoogleMaps";
import OrderCard from "./OrderCard";
import '../css/driver.scss';
import { getUser } from '../globalFunc/auth';


class Driver extends Component {
    constructor(props) {
        super(props);
        
        const user = getUser();
        console.log(user);
        

        this.state = {
            points: [],
            orders: [],
            zoom: 12,
            latLng: {
                lat: 49.2027, lng: -123.1007
            },
            bounds: null,
            current: null,
            accepted: false,
            user: user,
            currentOrder: {}
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
    acceptOrder = () => {
        this.setState({
            accepted: true
        })
    }
    componentDidMount() {
        axios.post('api/orders/getOrders', {}).then(resp => {
            this.setState({
                orders: resp.data
            })
            for(var x in this.state.orders) {
                this.state.points.push(this.state.orders[x].latLng)
            }
        })
        axios.post("api/users/getCurrent",{"driver":this.state.user.phoneNumber}).then((data)=>{
            this.setState({
                currentOrder: data.data
            })
            // console.log(data);
            
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(!Object.is(prevState.currentOrder,this.state.currentOrder)){
            console.log("reached")
            if (Object.keys(this.state.currentOrder).length > 0) {
                console.log(this.state.currentOrder)
                this.updateLatLng(this.state.currentOrder.latLng)
                // this.props.updateZoom();
                this.updateBounds(this.state.currentOrder.latLng);
            } 
        }
    }
    render() {
        return (
           <div className="driverMain">
               {Object.keys(this.state.currentOrder).length === 0 ? 
                    <div className="orderList">
                        <p className="title has-text-centered">Order List</p>
                            {this.state.orders.map((data,idx)=>{
                                return(
                                    // <div>{data.phone}</div>
                                    <OrderCard 
                                        driver={this.state.user}
                                        address={data.address}
                                        latLng={data.latLng}
                                        phone={data.phone}
                                        stripeToken={data.stripeToken}
                                        updateLatLng={this.updateLatLng}
                                        updateZoom={this.updateZoom}
                                        updateBounds={this.updateBounds}
                                        acceptOrder={this.acceptOrder}
                                        products={data.products}
                                        current={this.state.current}
                                        accepted={this.state.accepted}
                                        allOrders={this.state.orders}
                                    />
                                )
                        })}
                    </div> :
                    <div className="orderList">Current Order</div>
                }
               

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
