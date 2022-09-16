import { call, put} from "redux-saga/effects";
import userApi from "../api/userLoginApi";
import { userLoginActions } from '../userLogin'

export function* login(action) {
    try {
      const data = yield call(userApi.login, action.payload);
     yield put(userLoginActions.logInSuccess(data));
    } catch (error) {
      yield put(userLoginActions.logInFail(error.response.data.detail));
   }
}
 
export function* register(action) {
  try {
    const data = yield call(userApi.register, action.payload);
   yield put(userLoginActions.registerSuccess(data));
  } catch (error) {
    yield put(userLoginActions.registerFail(error.response.data.error));
 }
}

 export function* logout(action) {
   try {
   yield put(userLoginActions.logOutSuccess());
  } catch (error) {
    yield put(userLoginActions.logOutFail(error.response.data.detail));
 }
}