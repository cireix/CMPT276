import React from 'react'
import '../css/orderCard.scss';

export default class CurrentOrder extends React.Component {
    constructor(props) {
        super(props)
        var total = 0;
        for(var x in this.props.order.products) {
            var cProd = this.props.order.products[x];
            total += cProd.quantity * cProd.price;
        }
        this.state = {
            total: "$"+total.toFixed(2)
        }
    }
    render() {
        return (
            <div className="orderCard">
                <div className="order-info">
                    {
                        this.props.order.products.map(p => {
                            return (
                                <div className="pdct-info" key={p.id}>
                                    <div className="order-image-wrapper">
                                        <img className="order-image" src={p.image} />
                                    </div>
                                    <div className="order-text">
                                        <p><strong>Name: </strong>{ p.name}</p>
                                        <p><strong>Price: </strong>{"$" + p.price}</p>
                                        <p><strong>Quantity: </strong>{ p.quantity}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="order-total">
                      <p><strong>Total: </strong>{this.state.total}</p>
                    </div>
                    <hr style={{backgroundColor: "black"}}></hr>
                    <p className="order-addr"><strong>Address: </strong><span>{this.props.order.address}</span></p>
                    <p className="order-phone"><strong>Phone: </strong><a target={"tel:" + this.props.order.phone}>{this.props.order.phone}</a></p>
                </div>
            </div>
        )
    }
}