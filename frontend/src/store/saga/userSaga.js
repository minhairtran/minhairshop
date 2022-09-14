import { call, put} from "redux-saga/effects";
import userApi from "../api/userApi";
import { userActions } from '../user'

export function* login(action) {
    try {
      const data = yield call(userApi.login, action.payload);
     yield put(userActions.logInSuccess(data));
    } catch (error) {
      yield put(userActions.logInFail(error.response.data.detail));
   }
}
 
export function* register(action) {
  try {
    const data = yield call(userApi.register, action.payload);
   yield put(userActions.registerSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(userActions.registerFail(error.response.data.error));
 }
}

 export function* logout(action) {
   try {
    // const data = yield call(userApi.login, action.payload);
   yield put(userActions.logOutSuccess());
  } catch (error) {
    yield put(userActions.logOutFail(error.response.data.detail));
 }
}