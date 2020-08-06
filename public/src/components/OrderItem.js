import React from 'react';

export default class OrderItem extends React.Component {
    render() {
        const { image, name, price, quantity } = this.props.item;

        return (
            <div className="columns is-vcentered">
                <div className="column is-narrow">
                    <img src={image} alt="" width="20px" height="auto" />
                </div>

                <div className="column orderItem-name is-narrow">
                    {name}
                </div>

                <div className="column">
                    <span className="orderItem-price">${price}</span>
                </div>

                <div className="column">
                    <span className="orderItem-quantity">{quantity}</span>
                </div>
            </div>
        )
    }
}