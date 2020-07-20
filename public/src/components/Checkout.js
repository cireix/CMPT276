import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import StripeCheckoutButton from'components/StripeCheckoutButton';
import LocationSearchInput from 'components/LocationSearchInput'

const Checkout = ({ user, products, handleCloseCheckout, total }) => {
    return (
        <Modal.Dialog>
            <Modal.Header >
                <Modal.Title>Order Summary</Modal.Title>
                <Button variant="secondary"  onClick={handleCloseCheckout}>X</Button>
            </Modal.Header>
            <Modal.Body>
                <ul className="list-group mb-3" >
                    {
                        products.map(pdct => {
                            return (
                                <li className="list-group-item d-flex justify-content-between" key={pdct.productId}>
                                    <img src={pdct.image} alt="product-img" class="img-thumbnail" style={{height: '100px', width: 'auto'}}></img>
                                    <p>{pdct.name}</p>
                                    <p>{pdct.quantity}</p>
                                    <p>{'$' + pdct.price}</p>
                                </li>
                            )
                        }
                        )
                    }
                </ul>
                <ul className="list-group mb-3" >
                    <li className="list-group-item d-flex justify-content-end">
                    {/* <span>{'total quantity = ' + total.productQuantity}</span> */}
                        <span>Total price(CAD)  $</span> 
                        <strong>{total.totalPrice.toFixed(2)}</strong>
                    </li>
                </ul>
                <LocationSearchInput/>
            </Modal.Body>

            <Modal.Footer>
                <StripeCheckoutButton user={user} price={total.totalPrice.toFixed(2)} products={products}/>
            </Modal.Footer>
        </Modal.Dialog>
    )

}



export default Checkout;