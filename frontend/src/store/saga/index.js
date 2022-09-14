import { all, takeLatest } from 'redux-saga/effects'
import { fetchProducts, fetchProduct } from './productSaga'
import { login, logout, register } from './userSaga'
import { addProductToCart, removeProductFromCart } from './cartSaga'
import { productActions } from '../product'
import { cartActions } from '../cart'
import {userActions} from '../user'

export default function* rootSaga() {
    yield all([
        takeLatest(productActions.listProductsRequest.type, fetchProducts), 
        takeLatest(productActions.listProductRequest.type, fetchProduct),
        takeLatest(cartActions.addCartRequest.type, addProductToCart),
        takeLatest(cartActions.removeProductFromCartRequest.type, removeProductFromCart),
        takeLatest(userActions.logInRequest.type, login),
        takeLatest(userActions.logOutRequest.type, logout),
        takeLatest(userActions.registerRequest.type, register),
    ])
}