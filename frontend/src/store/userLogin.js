import { createSlice } from "@reduxjs/toolkit";

const initialUserLoginState = {
  loading: false,
  error: null,
  userLogin: null,
  status: null,
};

const userLoginSlice = createSlice({
  name: "user",
  initialState: initialUserLoginState,
  reducers: {
    logInRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    logInSuccess(state, action) {
      const data = action.payload.data;
      state.userLogin = data;
      // state.status = status;
      state.loading = false;
      state.error = null;
      localStorage.setItem('access_token', JSON.stringify(data.access_token))
    },
    logInFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.userLogin = null;
    },
    logOutRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    logOutSuccess(state, action) {
      state.userLogin = null;
      // state.status = status;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('access_token')
    },
    logOutFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    registerRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      const data = action.payload.data;
      state.userLogin = data;
      // state.status = status;
      state.loading = false;
      state.error = null;
      // localStorage.setItem('access_token', JSON.stringify(data.access_token))
    },
    registerFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const userLoginActions = userLoginSlice.actions;

export default userLoginSlice.reducer;
