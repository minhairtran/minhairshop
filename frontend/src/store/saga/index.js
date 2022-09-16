import { all, takeLatest } from "redux-saga/effects";
import { fetchProducts, fetchProduct } from "./productSaga";
import { login, logout, register } from "./userLoginSaga";
import {
  getUserProfile,
  updateUserProfile,
  getUsername,
  changePassword,
} from "./userProfileSaga";
import { addProductToCart, removeProductFromCart } from "./cartSaga";
import { productActions } from "../product";
import { cartActions } from "../cart";
import { userLoginActions } from "../userLogin";
import { userProfileActions } from "../userProfile";

export default function* rootSaga() {
  yield all([
    takeLatest(productActions.listProductsRequest.type, fetchProducts),
    takeLatest(productActions.listProductRequest.type, fetchProduct),
    takeLatest(cartActions.addCartRequest.type, addProductToCart),
    takeLatest(
      cartActions.removeProductFromCartRequest.type,
      removeProductFromCart
    ),
    takeLatest(userLoginActions.logInRequest.type, login),
    takeLatest(userLoginActions.logOutRequest.type, logout),
    takeLatest(userLoginActions.registerRequest.type, register),
    takeLatest(userProfileActions.getUserProfileRequest.type, getUserProfile),
    takeLatest(
      userProfileActions.updateUserProfileRequest.type,
      updateUserProfile
    ),
    takeLatest(userProfileActions.getUsernameRequest.type, getUsername),
    takeLatest(userProfileActions.changePasswordRequest.type, changePassword),
  ]);
}
