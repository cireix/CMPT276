import React, { Component } from 'react';
import ToolBox from './ToolBox';
import Product from './Product';
import { Cart, AddCartButton } from 'react-cart-components'
import axios from 'axios';
import '../css/products.scss';
import Checkout from './Checkout';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProducts: [],
            productsFullList: [],
            offset: 0,
            perPage: 18,
            currentPage: [],
            showCart: true,
            checkOutData: [],
            loading: false,
        }
    }

    async receivedData() {
        try {
            this.setState({ loading: true });
            const res = await axios.post('api/beer/products');
            this.setState({
                productsFullList: res.data.beer
            })

            this.setState({ loading: false });
        } catch (e) {
            this.setState({ loading: false });
            console.log(e)
        }

        this.setState({
            currentProducts: this.state.productsFullList.slice(this.state.offset, this.state.offset + this.state.perPage),
            pageCount: Math.ceil(this.state.productsFullList.length / this.state.perPage)
        })
    }


    componentDidMount() {
        this.receivedData();
    }

    // Search box
    search = async (string) => {
        // Get a copy of full list of products
        this.setState({ loading: true });
        const res = await axios.post('api/beer/products');
        this.setState({ loading: false });
        // Get an array of matched products
        let productList = res.data.beer.filter(pdct => {
            const match = pdct.fullName.match(new RegExp(string, 'gi'));
            return match !== null;
        })

        this.setState({
            productsFullList: productList,
            currentProducts: this.state.productsFullList.slice(this.state.offset, this.state.offset + this.state.perPage),
            pageCount: Math.ceil(this.state.productsFullList.length / this.state.perPage)
        })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });
    }

    handleCheckout = (data) => {
        if (!this.props.user.nickname) {
            this.props.history.push('/login');
            toast.error('Please login to checkout!');
        }
        this.setState({ showCart: false, checkOutData: data })

    }

    handleCloseCheckout = () => {
        this.setState({ showCart: true })
    }

    render() {
        const noMsg = {
            textAlign: 'center',
            width: '100%',
            marginBottom: '25px',
        };
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
                          (this.state.currentProducts.length === 0 && !this.state.loading) ?
                              <div style={noMsg}>Sorry no products match the search.</div>: this.state.currentProducts.map(pdct => {
                                if (pdct) {
                                    return (
                                        <div className='column is-2' key={pdct.productId}>
                                            <Product product={pdct} />
                                            <AddCartButton
                                                product={{ id: pdct.productId, name: pdct.fullName, price: pdct.price, image: pdct.image }}
                                                styles={{ backgroundColor: 'grey', color: 'white', border: '0' }}
                                            />
                                        </div>
                                    )
                                }

                            })
                        }
                    </div>

                    {/* <ReactPaginate className="mt-4"
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        activeClassName={'active'}
                        onPageChange={this.handlePageClick}
                        pageCount={this.state.pageCount} /> */}
                    {
                      (this.state.currentProducts.length !== 0 && !this.state.loading) && <ReactPaginate className="mt-4"
                                                                                  breakClassName={'button'}
                                                                                  containerClassName={'pagination justify-content-center'}
                                                                                  pageClassName={'button'}
                                                                                  previousClassName={'button'}
                                                                                  nextClassName={'button'}
                                                                                  activeClassName={'active'}
                                                                                  onPageChange={this.handlePageClick}
                                                                                  pageCount={this.state.pageCount} />
                    }


                </div>
            </div>
        )
    }
}

export default withRouter(Products);
