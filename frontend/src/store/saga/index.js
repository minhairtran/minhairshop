import { all, takeLatest } from 'redux-saga/effects'
import { fetchProducts, fetchProduct } from './productSaga'
import { addProductToCart, removeProductFromCart } from './cartSaga'
import { productActions } from '../product'
import {cartActions} from '../cart'



export default function* rootSaga() {
    yield all([
        takeLatest(productActions.listProductsRequest.type, fetchProducts), 
        
        takeLatest(productActions.listProductRequest.type, fetchProduct),
        takeLatest(cartActions.addCartRequest.type, addProductToCart),
        takeLatest(cartActions.removeProductFromCartRequest.type, removeProductFromCart),
    ])
}