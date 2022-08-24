import { call, put} from "redux-saga/effects";
import Api from "../api/productApi";
import { cartActions } from '../cart'

export function* addProductToCart(action) {
    try {
        const { data } = yield call(Api.fetchProduct, action.payload.id);
      const quantity = action.payload.quantity
        yield put(cartActions.addCartSuccess({ data, quantity }));
    } catch (error) {
      yield put(cartActions.addCartFail(error.message));
    }
}
  
export function* removeProductFromCart(action) {
  try {
      const { data } = yield call(Api.fetchProduct, action.payload);
      yield put(cartActions.removeProductFromCartSuccess(data ));
  } catch (error) {
    yield put(cartActions.removeProductFromCartFail(error.message));
  }
}
 