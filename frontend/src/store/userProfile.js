import { createSlice } from "@reduxjs/toolkit";

const initialUserProfileState = {
  loading: false,
  error: null,
  userProfile: null,
  username: null,
  passwordUpdateMessage: null
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: initialUserProfileState,
  reducers: {
    getUserProfileRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    getUserProfileSuccess(state, action) {
      const data = action.payload.data;
      state.userProfile = data;
      state.loading = false;
      state.error = null;
    },
    getUserProfileFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.userProfile = null;
    },
    getUsernameRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    getUsernameSuccess(state, action) {
      const data = action.payload.data;
      state.username = data;
      state.loading = false;
      state.error = null;
    },
    getUsernameFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.username = null;
    },
    goToChangePasswordRequest(state, action) {
      state.passwordUpdateMessage = null
    },
    changePasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    changePasswordSuccess(state, action) {
      const data = action.payload.data.message;
      state.passwordUpdateMessage = data;
      state.loading = false;
      state.error = null;
    },
    changePasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.passwordUpdateMessage = null;
    },
    updateUserProfileRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    updateUserProfileSuccess(state, action) {
      const data = action.payload.data;
      state.userProfile = data;
      state.loading = false;
      state.error = null;
    },
    updateUserProfileFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.userProfile = null;
    },
  },
});

export const userProfileActions = userProfileSlice.actions;

export default userProfileSlice.reducer;
