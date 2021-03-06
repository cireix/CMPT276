import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import StripeCheckoutButton from './StripeCheckoutButton';
import LocationSearchInput from './LocationSearchInput'

const Checkout = ({ user, products, handleCloseCheckout, total }) => {
    const [address, setAddress] = useState("");
    const [selected, setSelected] = useState(false);
    const [latlng,setLatLng] = useState({})
    function updateAddress(s){
        setAddress(s);
    }
    function updateSelected(b) {
        setSelected(b);
    }
    function updateLatLng(d) {
        setLatLng(d);
    }
    return (
        <Modal.Dialog>
            <Modal.Header >
                <Modal.Title>Order Summary</Modal.Title>
                <Button className="_button" variant="secondary"  onClick={handleCloseCheckout}>X</Button>
            </Modal.Header>
            <Modal.Body>
                <ul className="list-group mb-3" >
                    {
                        products.map(pdct => {
                            return (
                                <li className="list-group-item d-flex justify-content-between" key={pdct.productId}>
                                    <img src={pdct.image} alt="product-img" className="img-thumbnail" style={{height: '100px', width: 'auto'}}></img>
                                    <p>{pdct.name}</p>
                                    <p>{pdct.quantity}x</p>
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
                        <span>Total price (CAD)  $</span>
                        <strong className="test_strong">{total.totalPrice.toFixed(2)}</strong>
                    </li>
                </ul>
                <LocationSearchInput update={updateAddress} selectUpdate={updateSelected} latlngUpdate = {updateLatLng}/>
            </Modal.Body>
            <Modal.Footer>
                <StripeCheckoutButton user={user} price={total.totalPrice.toFixed(2)} products={products} disabled={selected ? false : true} latLng={latlng} address={address}/>
            </Modal.Footer>
        </Modal.Dialog>
    )

}



export default Checkout;
