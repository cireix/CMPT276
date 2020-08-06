import React, { Component } from 'react';
import axios from 'axios';
import GoogleMaps from "./GoogleMaps";
import OrderCard from "./OrderCard";
import { getUser } from '../globalFunc/auth';
import CurrentCard from './CurrentCard';
import { sendAlmost, sendHere, sendLocation } from "../globalFunc/Socket";
import '../css/driver.scss';
import { createNotification } from "../service/service";
import socketIOClient from "socket.io-client"
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
            currentOrder: {},
            interval: null
        }
        this.getCurrentLoc();
    }
    toGoogleLatLng(loc) {
        const googleMaps = window.google.maps
        return new googleMaps.LatLng(loc.lat,loc.lng)
    }
    getCurrentLoc = () => {
        console.log("Getting location")
        sendLocation(this.state.currentOrder.phone,this.state.current)
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.setState({
              current: pos
            })
            axios.post('api/users/updatePos', {
                driver: this.state.user.phoneNumber,
                loc: pos
            })
            
          });
        }
        if(this.state.currentOrder && Object.keys(this.state.currentOrder).length !== 0){
            this.updateBounds(this.state.currentOrder.latLng);
            const googleMaps = window.google.maps
            new googleMaps.DirectionsService().route({
                origin: this.toGoogleLatLng(this.state.current),
                destination: this.toGoogleLatLng(this.state.currentOrder.latLng),
                travelMode: googleMaps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === googleMaps.DirectionsStatus.OK) {
                    var eta = result.routes[0].legs[0].duration.value
                    console.log(eta)
                    if(eta <= 60){
                        sendHere(this.state.currentOrder.phone)
                        createNotification({
                            user: this.state.currentOrder.phone,
                            message: "Your order is here!",
                            orderId: this.state.currentOrder.stripeToken,
                        })
                    }else if(eta <= 300) {
                        eta = Math.round(eta/60)
                        sendAlmost(this.state.currentOrder.phone,eta)
                        createNotification({
                            user: this.state.currentOrder.phone,
                            message: "Your order is "+eta+" mins away!",
                            orderId: this.state.currentOrder.stripeToken,
                        })
                    }
                }
            });
        }   
    }
    updateLatLng = d => {
        this.setState({
            latLng: d
        })
    }
    updateBounds = (a) =>  {
        this.setState({
            bounds: [a,this.state.current]
        })
    }
    acceptOrder = (data) => {
        this.setState({
            accepted: true,
            currentOrder: data,
        })
        axios.post("api/users/createNotification",{
            user: data.phone,
            message: "Your order is on its way!",
            orderId: data.stripeToken
        })
    }
    componentDidMount() {
        var self = this;
        const socket = socketIOClient();
        socket.on("newOrder",(data)=>{
            this.state.orders.push(data);
            this.forceUpdate();
        })
        socket.on("finishOrder",(orderId)=>{
            console.log(orderId);
            if(this.state.currentOrder && 
                Object.keys(this.state.currentOrder).length !== 0 &&
                orderId === this.state.currentOrder.stripeToken){
                    //finish order
                    this.setState({
                        accepted: false,
                        currentOrder: [],
                    })
                    for(var x in this.state.orders){
                        const cur = this.state.orders[x]
                        if(cur.stripeToken === orderId){
                            this.state.orders.splice(x,1);
                        }
                    }
            }
            this.forceUpdate();
        })
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
                currentOrder: data.data,
                accepted: true
            })
        })
        this.setState({
            interval: setInterval(function(){self.getCurrentLoc()},10000)
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(!Object.is(prevState.currentOrder,this.state.currentOrder)){
            console.log("reached")
            if (this.state.currentOrder && Object.keys(this.state.currentOrder).length > 0) {
                console.log(this.state.currentOrder)
                this.updateLatLng(this.state.currentOrder.latLng)
                this.updateBounds(this.state.currentOrder.latLng);
            } 
        }
    }
    async moveTest(){
        await this.setState({
            current: {lat: 49.2222, lng: -123.0021}
        })
        // this.forceUpdate();
        this.updateBounds(this.state.currentOrder.latLng);
        console.log(this.state.current)
    }
    async moveTest2(){
        await this.setState({
            current: {lat: 49.2243, lng: -123.0046}
        })
        // this.forceUpdate();
        this.updateBounds(this.state.currentOrder.latLng);
        console.log(this.state.current)
    }
    async moveTest3(){
        await this.setState({
            current: {lat: 49.2258450, lng: -123.0057950}
        })
        // this.forceUpdate();
        this.updateBounds(this.state.currentOrder.latLng);
        console.log(this.state.current)
    }
    render() {
        return (
           <div className="driverMain">
               {this.state.currentOrder && Object.keys(this.state.currentOrder).length === 0 ? 
                    <div className="orderList">
                        <p className="title has-text-centered">Order List</p>
                            {this.state.orders.map((data,idx)=>{
                                return(
                                    // <div>{data.phone}</div>
                                    <OrderCard 
                                        driver={this.state.user}
                                        json = {data}
                                        address={data.address}
                                        latLng={data.latLng}
                                        phone={data.phone}
                                        stripeToken={data.stripeToken}
                                        updateLatLng={this.updateLatLng}
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
                    //change here use this.state.currentOrder
                    <div className="orderList">
                        <p className="title has-text-centered">Current Order</p>
                        <CurrentCard order={this.state.currentOrder} />
                        <button onClick={this.moveTest.bind(this)}>3 mins away test</button>
                        <br/>
                        <button onClick={this.moveTest2.bind(this)}>2 mins away test</button>
                        <br/>
                        <button onClick={this.moveTest3.bind(this)}>here test</button>
                    </div>
                }

                <GoogleMaps
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUutEZ3A0Nn-d2-j66fj7OeY7LLVGP-Wo"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={ <div style={{ height: 'calc(100vh - 45px)', width: '100%' }} /> }
                    mapElement={ <div style={{ height: `100%` }} />}
                    points={this.state.points}
                    zoom={this.state.zoom}
                    latLng={this.state.latLng}
                    bounds={this.state.bounds}
                    current={this.state.current}
                    accepted={this.state.accepted}
                />
           </div>
        )
    }
}

export default Driver;
