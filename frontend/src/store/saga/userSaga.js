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
