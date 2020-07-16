import React, { Component } from 'react';
import ToolBox from 'components/ToolBox';
import Product from 'components/Product';
import axios from 'axios';
import 'css/products.scss';

class Products extends Component {
    
    // Product details, only for local test
    state = {
        currentProducts: [{"_id":{"$oid":"5d28522e2870460a36f78e9d"},"productId":"35182","alcoholPercentage":{"$numberInt":"8"},"companyName":"BARKERVILLE ","country":"Canada","countryCode":"CA","desc":"This smooth Northwest IPA features hints of soft pineapple, succulent stone fruit, ripe grapefruit and sticky pine forest balanced with a subtle malt base. The gold mine you've been searching for, this 80 IBU motherlode of hops includes Columbus and Chinook, followed by dry-hopping with Amarillo, Citra and Centennial.\n","fullName":"BARKERVILLE - HIGH STAKES","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/35182.jpg","price":{"$numberDouble":"5.99"},"productName":" HIGH STAKES","rating":{"$numberDouble":"4.6"},"size":{"$numberInt":"1"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.65"}},
        {"_id":{"$oid":"5d28522e2870460a36f78e8d"},"productId":"880930","alcoholPercentage":{"$numberInt":"7"},"companyName":null,"country":"Canada","countryCode":"CA","desc":false,"fullName":"33 ACRES OF NIRVANA 6 PACK","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/880930.jpg","price":{"$numberDouble":"13.49"},"productName":"33 ACRES OF NIRVANA 6 PACK","rating":{"$numberInt":"3"},"size":{"$numberInt":"6"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.33"}},
        {"_id":{"$oid":"5d28522e2870460a36f78e8e"},"productId":"837591","alcoholPercentage":{"$numberDouble":"5.6"},"companyName":null,"country":"Canada","countryCode":"CA","desc":"A full flavoured beer integrated with a distinct floral hop gives a quality unique to our Pacific Northwest surroundings. This style is evolutionary from a IPA with an assertive hop, lower alcohol content, and slight pine aroma. Low in malt, this beer has a refined quality and a refreshing temperament.\n","fullName":"33 ACRES OF OCEAN PALE ALE","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/837591.jpg","price":{"$numberDouble":"12.29"},"productName":"33 ACRES OF OCEAN PALE ALE","rating":{"$numberDouble":"3.2"},"size":{"$numberInt":"6"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.33"}},
        {"_id":{"$oid":"5d28522e2870460a36f78eb9"},"productId":"410167","alcoholPercentage":{"$numberInt":"6"},"companyName":"CANNERY BREWING ","country":"Canada","countryCode":"CA","desc":"The Cannery Collection is a mix-pack of 6 x 355ml cans which offers up a great diversity of styles. Enjoy 2 cans of the full-bodied Anarchist Amber Ale, 2 cans of the crisp and refreshing Lakeboat Lager, and 2 cans of the smooth velvety Naramata Nut Brown Ale.\n","fullName":"CANNERY BREWING - VARIETY PACK 6 CANS","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/410167.jpg","price":{"$numberDouble":"11.99"},"productName":" VARIETY PACK 6 CANS","rating":{"$numberDouble":"3.9"},"size":{"$numberInt":"6"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.355"}},
        {"_id":{"$oid":"5d28522e2870460a36f78ea8"},"productId":"394536","alcoholPercentage":{"$numberDouble":"4.8"},"companyName":null,"country":"Germany","countryCode":"DE","desc":"Bitburger is a classic pilsner from Germany's Rhineland. Light, aromatic and clean-tasting, it opens with a round, sweet maltiness followed by a dry, hoppy finish.\n","fullName":"BITBURGER PREMIUM TALL CAN","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/394536.jpg","price":{"$numberDouble":"2.19"},"productName":"BITBURGER PREMIUM TALL CAN","rating":{"$numberDouble":"4.2"},"size":{"$numberInt":"1"},"type":"Import Beer","volume":{"$numberDouble":"0.5"}},
        {"_id":{"$oid":"5d28522e2870460a36f78ebc"},"productId":"276188","alcoholPercentage":{"$numberInt":"5"},"companyName":null,"country":"Denmark","countryCode":"DK","desc":"A refreshing and uniquely characterful Danish premium pilsner with a malty backbone and balanced bitterness.  Bottom fermented lager beer: the first of its kind using pure yeast.\n","fullName":"CARLSBERG TALL CAN","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/276188.jpg","price":{"$numberDouble":"2.29"},"productName":"CARLSBERG TALL CAN","rating":{"$numberDouble":"3.8"},"size":{"$numberInt":"1"},"type":"Import Beer","volume":{"$numberDouble":"0.5"}},
        {"_id":{"$oid":"5d28522e2870460a36f78ec0"},"productId":"172566","alcoholPercentage":{"$numberInt":"5"},"companyName":"CENTRAL CITY ","country":"Canada","countryCode":"CA","desc":"Easy drinking with a touch of sun-kissed colour, this blonde ale is refreshing and smooth with a subtle malt flavour.\n","fullName":"CENTRAL CITY - RED RACER DIRTY BLONDE ALE TALL CAN","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/172566.jpg","price":{"$numberDouble":"12.29"},"productName":" RED RACER DIRTY BLONDE ALE TALL CAN","rating":{"$numberDouble":"4.7"},"size":{"$numberInt":"6"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.5"}},
        {"_id":{"$oid":"5d28522e2870460a36f78ec1"},"productId":"127112","alcoholPercentage":{"$numberDouble":"6.5"},"companyName":"CENTRAL CITY ","country":"Canada","countryCode":"CA","desc":"Don't be deterred by the idea of IPA in a can—but do pour it into a glass so you can enjoy the full experience. Pouring orange with a thick, creamy head and a potent, tropical/grapefruit hop aroma, this fantastic IPA shows off an array of hop flavours on a strong base of malt.\n","fullName":"CENTRAL CITY - RED RACER IPA 500ML 6PACK","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/127112.jpg","price":{"$numberDouble":"13.29"},"productName":" RED RACER IPA 500ML 6PACK","rating":{"$numberDouble":"4.4"},"size":{"$numberInt":"6"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.5"}},
        {"_id":{"$oid":"5d28522e2870460a36f78ecd"},"productId":"919373","alcoholPercentage":{"$numberInt":"5"},"companyName":"COLUMBIA ","country":"Canada","countryCode":"CA","desc":"A Canadian lager brewed in the BC interior, where glacier rivers flow from pristine mountain tops. Kokanee is fermented at colder temperatures, providing a clean refreshing experience with a very smooth finish.\n","fullName":"COLUMBIA - KOKANEE CAN","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/919373.jpg","price":{"$numberDouble":"37.49"},"productName":" KOKANEE CAN","rating":{"$numberDouble":"2.8"},"size":{"$numberInt":"24"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.355"}},
        {"_id":{"$oid":"5d28522e2870460a36f78ee5"},"productId":"163111","alcoholPercentage":{"$numberInt":"5"},"companyName":"DEAD FROG ","country":"Canada","countryCode":"CA","desc":"A refreshing white ale with a fresh squeeze of lime, crushed ginger, and a crisp, easy-drinking finish.\n","fullName":"DEAD FROG - MOSCOW MULE WHITE ALE TALL CAN 4 PACK","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/163111.jpg","price":{"$numberDouble":"10.79"},"productName":" MOSCOW MULE WHITE ALE TALL CAN 4 PACK","rating":{"$numberInt":"5"},"size":{"$numberInt":"4"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.473"}}
        ],
        productsFullList: [
            {"_id":{"$oid":"5d28522e2870460a36f78e9d"},"productId":"35182","alcoholPercentage":{"$numberInt":"8"},"companyName":"BARKERVILLE ","country":"Canada","countryCode":"CA","desc":"This smooth Northwest IPA features hints of soft pineapple, succulent stone fruit, ripe grapefruit and sticky pine forest balanced with a subtle malt base. The gold mine you've been searching for, this 80 IBU motherlode of hops includes Columbus and Chinook, followed by dry-hopping with Amarillo, Citra and Centennial.\n","fullName":"BARKERVILLE - HIGH STAKES","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/35182.jpg","price":{"$numberDouble":"5.99"},"productName":" HIGH STAKES","rating":{"$numberDouble":"4.6"},"size":{"$numberInt":"1"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.65"}},
            {"_id":{"$oid":"5d28522e2870460a36f78e8d"},"productId":"880930","alcoholPercentage":{"$numberInt":"7"},"companyName":null,"country":"Canada","countryCode":"CA","desc":false,"fullName":"33 ACRES OF NIRVANA 6 PACK","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/880930.jpg","price":{"$numberDouble":"13.49"},"productName":"33 ACRES OF NIRVANA 6 PACK","rating":{"$numberInt":"3"},"size":{"$numberInt":"6"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.33"}},
            {"_id":{"$oid":"5d28522e2870460a36f78e8e"},"productId":"837591","alcoholPercentage":{"$numberDouble":"5.6"},"companyName":null,"country":"Canada","countryCode":"CA","desc":"A full flavoured beer integrated with a distinct floral hop gives a quality unique to our Pacific Northwest surroundings. This style is evolutionary from a IPA with an assertive hop, lower alcohol content, and slight pine aroma. Low in malt, this beer has a refined quality and a refreshing temperament.\n","fullName":"33 ACRES OF OCEAN PALE ALE","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/837591.jpg","price":{"$numberDouble":"12.29"},"productName":"33 ACRES OF OCEAN PALE ALE","rating":{"$numberDouble":"3.2"},"size":{"$numberInt":"6"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.33"}},
            {"_id":{"$oid":"5d28522e2870460a36f78eb9"},"productId":"410167","alcoholPercentage":{"$numberInt":"6"},"companyName":"CANNERY BREWING ","country":"Canada","countryCode":"CA","desc":"The Cannery Collection is a mix-pack of 6 x 355ml cans which offers up a great diversity of styles. Enjoy 2 cans of the full-bodied Anarchist Amber Ale, 2 cans of the crisp and refreshing Lakeboat Lager, and 2 cans of the smooth velvety Naramata Nut Brown Ale.\n","fullName":"CANNERY BREWING - VARIETY PACK 6 CANS","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/410167.jpg","price":{"$numberDouble":"11.99"},"productName":" VARIETY PACK 6 CANS","rating":{"$numberDouble":"3.9"},"size":{"$numberInt":"6"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.355"}},
            {"_id":{"$oid":"5d28522e2870460a36f78ea8"},"productId":"394536","alcoholPercentage":{"$numberDouble":"4.8"},"companyName":null,"country":"Germany","countryCode":"DE","desc":"Bitburger is a classic pilsner from Germany's Rhineland. Light, aromatic and clean-tasting, it opens with a round, sweet maltiness followed by a dry, hoppy finish.\n","fullName":"BITBURGER PREMIUM TALL CAN","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/394536.jpg","price":{"$numberDouble":"2.19"},"productName":"BITBURGER PREMIUM TALL CAN","rating":{"$numberDouble":"4.2"},"size":{"$numberInt":"1"},"type":"Import Beer","volume":{"$numberDouble":"0.5"}},
            {"_id":{"$oid":"5d28522e2870460a36f78ebc"},"productId":"276188","alcoholPercentage":{"$numberInt":"5"},"companyName":null,"country":"Denmark","countryCode":"DK","desc":"A refreshing and uniquely characterful Danish premium pilsner with a malty backbone and balanced bitterness.  Bottom fermented lager beer: the first of its kind using pure yeast.\n","fullName":"CARLSBERG TALL CAN","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/276188.jpg","price":{"$numberDouble":"2.29"},"productName":"CARLSBERG TALL CAN","rating":{"$numberDouble":"3.8"},"size":{"$numberInt":"1"},"type":"Import Beer","volume":{"$numberDouble":"0.5"}},
            {"_id":{"$oid":"5d28522e2870460a36f78ec0"},"productId":"172566","alcoholPercentage":{"$numberInt":"5"},"companyName":"CENTRAL CITY ","country":"Canada","countryCode":"CA","desc":"Easy drinking with a touch of sun-kissed colour, this blonde ale is refreshing and smooth with a subtle malt flavour.\n","fullName":"CENTRAL CITY - RED RACER DIRTY BLONDE ALE TALL CAN","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/172566.jpg","price":{"$numberDouble":"12.29"},"productName":" RED RACER DIRTY BLONDE ALE TALL CAN","rating":{"$numberDouble":"4.7"},"size":{"$numberInt":"6"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.5"}},
            {"_id":{"$oid":"5d28522e2870460a36f78ec1"},"productId":"127112","alcoholPercentage":{"$numberDouble":"6.5"},"companyName":"CENTRAL CITY ","country":"Canada","countryCode":"CA","desc":"Don't be deterred by the idea of IPA in a can—but do pour it into a glass so you can enjoy the full experience. Pouring orange with a thick, creamy head and a potent, tropical/grapefruit hop aroma, this fantastic IPA shows off an array of hop flavours on a strong base of malt.\n","fullName":"CENTRAL CITY - RED RACER IPA 500ML 6PACK","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/127112.jpg","price":{"$numberDouble":"13.29"},"productName":" RED RACER IPA 500ML 6PACK","rating":{"$numberDouble":"4.4"},"size":{"$numberInt":"6"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.5"}},
            {"_id":{"$oid":"5d28522e2870460a36f78ecd"},"productId":"919373","alcoholPercentage":{"$numberInt":"5"},"companyName":"COLUMBIA ","country":"Canada","countryCode":"CA","desc":"A Canadian lager brewed in the BC interior, where glacier rivers flow from pristine mountain tops. Kokanee is fermented at colder temperatures, providing a clean refreshing experience with a very smooth finish.\n","fullName":"COLUMBIA - KOKANEE CAN","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/919373.jpg","price":{"$numberDouble":"37.49"},"productName":" KOKANEE CAN","rating":{"$numberDouble":"2.8"},"size":{"$numberInt":"24"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.355"}},
            {"_id":{"$oid":"5d28522e2870460a36f78ee5"},"productId":"163111","alcoholPercentage":{"$numberInt":"5"},"companyName":"DEAD FROG ","country":"Canada","countryCode":"CA","desc":"A refreshing white ale with a fresh squeeze of lime, crushed ginger, and a crisp, easy-drinking finish.\n","fullName":"DEAD FROG - MOSCOW MULE WHITE ALE TALL CAN 4 PACK","image":"http://www.bcliquorstores.com/sites/default/files/imagecache/height400px/163111.jpg","price":{"$numberDouble":"10.79"},"productName":" MOSCOW MULE WHITE ALE TALL CAN 4 PACK","rating":{"$numberInt":"5"},"size":{"$numberInt":"4"},"type":"Domestic - BC Beer","volume":{"$numberDouble":"0.473"}}
        ],
        cartNum: 0
    }

    // componentDidMount() {
    //     axios.get('/products').then(response => {
    //         this.setState({
    //             currentProducts: response.data,
    //             productsFullList: response.data
    //         })
    //     }).catch (error => {
    //         console.log(error);
    //     })
    // }

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

export default Products;