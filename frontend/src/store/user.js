import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  loading: false,
  error: null,
  user: null,
  status: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logInRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    logInSuccess(state, action) {
      const data = action.payload.data;
      state.user = data;
      // state.status = status;

      state.loading = false;
      state.error = null;
      localStorage.setItem('userInfo', JSON.stringify(data.access))
    },
    logInFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
