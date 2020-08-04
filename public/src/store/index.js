import { createStore, combineReducers } from 'redux'
import { CartReducers } from "react-cart-components";


export default createStore(
  combineReducers({
    cart: CartReducers
  })
);
