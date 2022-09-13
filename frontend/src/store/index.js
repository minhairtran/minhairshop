import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import productReducer from "./product"
import cartReducer from "./cart"
import userReducer from "./user"
import rootSaga from './saga/index'


const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: { product: productReducer, cart: cartReducer, user: userReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store