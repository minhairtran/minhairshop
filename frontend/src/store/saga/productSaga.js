import { call, put} from "redux-saga/effects";
import productApi from "../api/productApi";
import { productActions } from '../product'

export function* fetchProducts() {
  try {
    const { data } = yield call(productApi.fetchProducts);

    yield put(productActions.listProductsSuccess(data));
  } catch (error) {
    yield put(productActions.listProductsFail(error.message));
  }
}

export function* fetchProduct(action) {
   try {
      const { data } = yield call(productApi.fetchProduct, action.payload);
     yield put(productActions.listProductSuccess(data));
   } catch (error) {
     yield put(productActions.listProductFail(error.message));
   }
 }
