import React from 'react';
import OrderItem from '../components/OrderItem';
import '../css/OrderInfo.scss'

export default class OrderInfo extends React.Component {
    constructor(props){
        super(props);
        console.log("here",this.props.details.products)
    }

    totalPrice = () => {
        const totalPrice = this.props.details.products.map(item => item.quantity * item.price)
        .reduce((a, value) => a + value, 0)
        return totalPrice;
    }
   render() {
       return (
           
           <div className="order-detail">
               <p className="title has-text-centered">Order Detail</p>
               <div className="order-body">
                    {
                        this.props.details.products.map(item => {
                            return (
                                <OrderItem item={item} />
                            )
                        })
                    }
               </div>
               <div className="order-footer">
                    <div className="order-total">Total: ${parseInt(this.totalPrice())}</div>
                    <div className="order-status">Status: </div>
               </div>
           </div>
       )
   } 
}