import React, { Component } from 'react';
import ToolBox from 'components/ToolBox';
import Product from 'components/Product';
import { Cart, AddCartButton } from 'react-cart-components'
import axios from 'axios';
import 'css/products.scss';

class Products extends Component {
    
    // Product details, only for local test
    state = {
        currentProducts: [],
        productsFullList: [],
        cartNum: 0,
        maxPerPage: 18,
        numOfFirst: 0,
        currentPage: [],
    }

    async componentDidMount() {
        // Get data from server side
        try {
            const res = await axios.post('api/beer/products');
            console.log(res.data.beer);
            this.setState({
                productsFullList: res.data.beer
            })
        } catch (e) {
            console.log(e)
        }

        //  Display 24 products per page
        var currentPage = [];
        var num = this.state.numOfFirst;
        for (num; num < this.state.numOfFirst + this.state.maxPerPage; num ++) {
            currentPage.push(this.state.productsFullList[num])
        }
        this.setState({
            currentPage: currentPage,
            numOfFirst: num
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

    // Go to the next page
    toNextPage = () => {
        var currentPage = [];
        var num = this.state.numOfFirst
        for (num; num < this.state.numOfFirst + this.state.maxPerPage; num ++) {
            currentPage.push(this.state.productsFullList[num])
        }
        this.setState({
            currentPage: currentPage,
            numOfFirst: num
        })
    }

    // Go to the previous page
    toPervPage = () => {
        var currentPage = [];
        var num = this.state.numOfFirst - 2 * this.state.maxPerPage
        for (num; num < this.state.numOfFirst - this.state.maxPerPage; num ++) {
            currentPage.push(this.state.productsFullList[num])
        }
        this.setState({
            currentPage: currentPage,
            numOfFirst: num
        })
    }

    render() {
        return (
            <div>
                <ToolBox search={this.search} cartNum={this.state.cartNum} />
                <Cart currency="CAD" />
                <div className="products">
                    <div className="columns is-multiline ">
                        {
                            this.state.currentPage.map(pdct => {
                                return (
                                    <div className="column is-2" key={pdct.productId}>
                                        <Product product={pdct} />
                                        <AddCartButton
                                        product={{id: pdct.productId, name: pdct.fullName, price: pdct.price, image:pdct.image}}
                                        styles={{ backgroundColor: 'grey', color: 'white', border: '0' }}
                                     />
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                    <div className="control to-another">
                        <button 
                            className="button to-prev" 
                            onClick={this.toPervPage}
                            disabled={this.state.numOfFirst === this.state.maxPerPage ? true : false}
                            >Previous Page
                        </button>
                        <button className="button" onClick={this.toNextPage}>Next Page</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Products