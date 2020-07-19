import React, { Component } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'css/product.scss';

class Product extends Component {

    // add this product into cart
    // addCart = () => {
    //     const { productId, productName, image,  type , price, volume } = this.props.product;
    //     // Check if this product is in the cart, return an array containing this product or []
    //     axios.get(`/carts/?productId=${productId}`).then(res => {
    //         // If so, add the number of this object with 1,then post it
    //         if (res.data.length > 0) {
    //             const product = res.data[0]
    //             product.num += 1;
    //             axios.put(`/carts/${product.productId}`, product)
    //             .catch(err => console.log('put cart err => ', err));
    //         // If not, post a brand new object
    //         } else {
    //             const product = {
    //                 productId: productId,
    //                 productName,
    //                 image,
    //                 price,
    //                 num: 1
    //             }
    //             axios.post('/carts',product)
    //             .catch(err => console.log('post cart err => ', err));
    //         }
    //         // This function is defined in Products component, and is used to update the number of products in cart
    //         this.props.updateCart();
    //         toast.success('Add cart successful');    
    //     })
    //     .catch(err => {
    //         console.log('get cart err => ', err);
    //         toast.error('Add cart failed');
    //     })
    // }

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
                    {/* <button className="add-cart" >
                        <i className="fas fa-shopping-cart"></i> 
                    </button> */}
                </div>
            </div>
        )
    }
}

export default Product;