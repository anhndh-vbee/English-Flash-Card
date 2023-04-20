import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      currentUser: null,
      loading: false,
      error: false,
    },
    register: {
      loading: false,
      error: false,
      success: false,
    },
    logout: {
      loading: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.loading = true;
    },
    loginSuccess: (state, action) => {
      state.login.loading = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.loading = false;
      state.login.error = true;
    },

    registerStart: (state) => {
      state.register.loading = true;
    },
    registerSuccess: (state) => {
      state.register.loading = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerFailed: (state) => {
      state.register.loading = false;
      state.register.error = true;
      state.register.success = false;
    },

    logoutStart: (state) => {
      state.logout.loading = true;
    },
    logoutSuccess: (state) => {
      state.logout.loading = false;
      state.login.currentUser = null;
      state.logout.error = false;
    },
    logoutFailed: (state) => {
      state.logout.loading = false;
      state.logout.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
