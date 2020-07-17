import React, { Component } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'css/product.scss';

class Product extends Component {
    render() {
        const { productName, image,  type , price, volume } = this.props.product;
        const productPrice = '$' + price;
        const productVolume = volume + 'L';

        return (
            <div className="product">
                <div className="img-wrapper">
                    <figure className="image">
                        <img className="img" src={image} alt="" />
                    </figure> 
                    <p className="p-volume">{productVolume}</p>
                    <p className="p-name">{productName}</p>
                </div>
                <div className="p-footer">
                    <p className="p-price">{productPrice}</p>      
                    <button className="add-cart" >
                        <i className="fas fa-shopping-cart"></i> 
                    </button>
                </div>
            </div>
        )
    }
}

export default Product;