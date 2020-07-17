import React, { Component } from 'react';
import ToolBox from 'components/ToolBox';
import Product from 'components/Product';
import axios from 'axios';
import 'css/products.scss';

class Products extends Component {
    
    // Product details, only for local test
    state = {
        currentProducts: [],
        productsFullList: [],
        cartNum: 0

    }

    componentDidMount() {
        axios.post('api/beer/products').then(response => {
            console.log(response.data.beer);
            this.setState({
                currentProducts: response.data.beer,
                productsFullList: response.data.beer
            })
        }).catch (error => {
            console.log(error);
        })
    }

    // Search box 
    search = (string) => {
        // Get a copy of full list of products
        var productList = [...this.state.productsFullList]
        // Get an array of matched products
        productList = productList.filter( pdct => {
            const match = pdct.fullName.match(new RegExp(string, 'gi'));
            return match !== null;
        })
        // Render the matched products
        this.setState({
            currentProducts: productList
        })
    }

    // // Update the cartNum state
    // updateCart = async () => {
    //     const cartNum = await this.getCartNum();
    //     this.setState({
    //         cartNum: cartNum
    //     });
    // }

    // // Get the sum of numbers of products in the cart
    // getCartNum = () => {
    //     // Return a list containing all products in the cart
    //     axios.get('/carts')
    //     .then(res => {
    //         const carts = res.data;
    //         var cartNum = 0;
    //         // If cart is not empty, return the sum 
    //         if (carts !== []) {
    //             carts.forEach(cart => {
    //                 cartNum += cart.num
    //             })
    //         }
    //         return cartNum; 
    //     })
    //     .catch(err => console.log('get sum err => ', err))
    // }

    render() {
        return (
            <div>
                <ToolBox search={this.search} cartNum={this.state.cartNum} />
                <div className="products">
                    <div className="columns is-multiline ">
                        {
                            this.state.currentProducts.map(pdct => {
                                return (
                                    <div className="column is-2" key={pdct.productId}>
                                        <Product product={pdct} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Products