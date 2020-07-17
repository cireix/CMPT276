import React, { Component } from 'react';
import ToolBox from 'components/ToolBox';
import Product from 'components/Product';
import { Cart, AddCartButton } from 'react-cart-components'
import axios from 'axios';
import 'css/products.scss';

class Products extends Component {
    
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

    render() {
        return (
            <div>
                <ToolBox search={this.search} cartNum={this.state.cartNum} />
                <Cart currency="CAD" />
                <div className="products">
                    <div className="columns is-multiline ">
                        {
                            this.state.currentProducts.map(pdct => {
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
                </div>
            </div>
        )
    }
}

export default Products