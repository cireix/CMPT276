import React, { Component } from 'react';
// import axios from 'axios';
// import {toast} from 'react-toastify';
import 'css/orderCard.scss';

// address: "CF Richmond Centre, Number 3 Road, Richmond, BC, Canada"
// complete: false
// latLng: {lat: 49.1672705, lng: -123.1384481}
// phone: "+16047263370"
// products: Array(2)
// 0:
    // id: "276188"
    // image: "http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/276188.jpg"
    // name: "CARLSBERG TALL CAN"
    // price: 2.29
    // quantity: 2
// 1:
    // id: "410167"
    // image: "http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/410167.jpg"
    // name: "CANNERY BREWING - VARIETY PACK 6 CANS"
    // price: 11.99
    // quantity: 1
// stripeToken: "tok_1H7DFdIWCPZAHnFyUSCzfTyc"
// timestamp: 1595306329
// __v: 0
// _id: "5f16715c9b96a33e57706898"

class OrderCard extends Component {
    constructor(props){
        super(props)
    }
    sendDetails() {

    }
    refreshMap = () =>{
        console.log("latlng: ", this.props.latLng);
        this.props.updateLatLng(this.props.latLng)
        this.props.updateZoom();
    }
    render() {
        return (
           <div className="orderCard">
               <div className="order-info">
                    {
                        this.props.products.map(p => {
                            return (
                                <div className="pdct-info">
                                    <img className="order-image" src={p.image} />
                                    <div className="order-text">
                                        <p><strong>Name: </strong>{ p.name}</p>
                                        <p><strong>Price: </strong>{"$" + p.price}</p>
                                        <p><strong>Quantity: </strong>{ p.quantity}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <p className="order-addr">Address: <span>{this.props.address}</span></p>
               </div>
               <button className="button order-button" onClick={this.refreshMap}>Accept</button>             
           </div>
        )
    }
}

export default OrderCard;