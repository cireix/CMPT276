import React, { Component } from 'react';
import ToolBox from 'components/ToolBox';
import Product from 'components/Product';
import { Cart, AddCartButton } from 'react-cart-components'
import axios from 'axios';
import 'css/products.scss';
import Checkout from 'components/Checkout';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProducts: [],
            productsFullList: [],
            maxPerPage: 18,
            numOfFirst: 0,
            currentPage: [],
            showCart: true,
            checkOutData: []
        }
    }



    async componentDidMount() {
        // Get data from server side
        try {
            const res = await axios.post('api/beer/products');
            this.setState({
                currentProducts: res.data.beer,
                productsFullList: res.data.beer
            })
        } catch (e) {
            console.log(e)
        }

        //  Display 18 products per page
        var currentPage = [];
        for (var num = 0; num < this.state.numOfFirst + this.state.maxPerPage; num ++) {
            currentPage.push(this.state.productsFullList[num])
        }
        this.setState({
            currentPage: currentPage,
            numOfFirst: num
        })
    }

    // Search box 
    search = async(string) => {
        // Get a copy of full list of products
        var productList = [...this.state.productsFullList]
        // Get an array of matched products
        productList = productList.filter( pdct => {
            const match = pdct.fullName.match(new RegExp(string, 'gi'));
            return match !== null;
        })
        // currentProducts contains all matched objects
        await this.setState({
            currentProducts: productList
        })

        // Push 18 objects in matched list into currentPage list to render
        // When next page button is clicked, push another 18 with 19th object start.....
        var currentPage = [];
        if (productList.length <= this.state.maxPerPage) {
            this.setState({
                currentPage: productList,
                numOfFirst: this.state.currentProducts.length
            })
        } else {
            for (var num = 0; num < this.state.maxPerPage; num ++) {
                currentPage.push(this.state.currentProducts[num])
            }
            console.log(currentPage)
            this.setState({
                currentPage: currentPage,
                numOfFirst: num
            })
        }
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
        var num = this.state.numOfFirst;
        for (num; num < this.state.numOfFirst + this.state.maxPerPage; num ++) {
            if (num === this.state.currentProducts.length) break;
            currentPage.push(this.state.currentProducts[num]);
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
            currentPage.push(this.state.currentProducts[num])
        }
        this.setState({
            currentPage: currentPage,
            numOfFirst: num
        })
    }

    handleCheckout = (data) => {
        if (!this.props.user.nickname) {
            this.props.history.push('/login');
            toast.error('Please login to checkout!');
        }
        console.log(data);
        this.setState({ showCart: false, checkOutData: data })

    }

    handleCloseCheckout = () => {
        this.setState({ showCart: true })
    }

    render() {
        return (
            <div>
                <ToolBox search={this.search} />
                {this.state.showCart ?
                    <Cart currency="CAD" handleCheckout={this.handleCheckout} />
                    : <Checkout user={this.props.user} products={this.state.checkOutData.products} handleCloseCheckout={this.handleCloseCheckout} total={this.state.checkOutData.total} />
                }
                <div className={this.state.showCart ? 'products' : 'hide'} >
                    <div className="columns is-multiline">
                        {
                            this.state.currentPage.map(pdct => {
                                return (
                                    <div className='column is-2' key={pdct.productId}>
                                        <Product product={pdct} />
                                        <AddCartButton
                                            product={{ id: pdct.productId, name: pdct.fullName, price: pdct.price, image: pdct.image }}
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
                            disabled={this.state.numOfFirst < 2 * this.state.maxPerPage ? true : false}
                            >Previous Page
                        </button>
                        <button 
                            className="button" 
                            onClick={this.toNextPage}
                            disabled={this.state.numOfFirst === this.state.currentProducts.length ? true : false}
                            >Next Page</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Products);