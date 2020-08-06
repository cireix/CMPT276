import React from 'react';

export default class OrderInfo extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.details);
    }
   render() {
       return (
           
           <div className="order-detail">
               <p className="title has-text-centered">Order Detail</p>
           </div>
       )
   } 
}