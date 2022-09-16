import { call, put} from "redux-saga/effects";
import userProfileApi from "../api/userProfileApi";
import { userProfileActions } from '../userProfile'

export function* getUserProfile(action) {
    try {
      const data = yield call(userProfileApi.getUserProfile, action.payload);
     yield put(userProfileActions.getUserProfileSuccess(data));
    } catch (error) {
      yield put(userProfileActions.getUserProfileFail(error.response.data.detail));
   }
}

export function* getUsername(action) {
  try {
    const data = yield call(userProfileApi.getUsername, action.payload);
   yield put(userProfileActions.getUsernameSuccess(data));
  } catch (error) {
    yield put(userProfileActions.getUsernameFail(error.response.data.detail));
 }
}

export function* changePassword(action) {
  try {
    const data = yield call(userProfileApi.changePassword, action.payload);
   yield put(userProfileActions.changePasswordSuccess(data));
  } catch (error) {
    yield put(userProfileActions.changePasswordFail(error.response.data));
 }
}

export function* updateUserProfile(action) {
    try {
      const data = yield call(userProfileApi.updateUserProfile, action.payload);
     yield put(userProfileActions.updateUserProfileSuccess(data));
    } catch (error) {
      yield put(userProfileActions.updateUserProfileFail(error.response.data.detail));
   }
}