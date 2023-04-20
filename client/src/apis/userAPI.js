import axios from 'axios';
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutStart,
  registerFailed,
  registerStart,
  registerSuccess,
} from '../redux/authSlice';
import DOMAIN from '../config';

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${DOMAIN}/auth/login`, user);
    dispatch(loginSuccess(res.data));
    navigate('/');
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post(`${DOMAIN}/auth/register`, user);
    dispatch(registerSuccess());
    navigate('/login');
  } catch (error) {
    dispatch(registerFailed());
  }
};

export const refreshToken = async () => {
  try {
    const res = await axios.post(`${DOMAIN}/refresh`, {
      // nếu có cookie thì cần gán vào
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (dispatch, id, navigate, accessToken) => {
  dispatch(logoutStart());
  try {
    await axios.post(`${DOMAIN}/logout`, id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(loginSuccess());
    navigate('/login');
  } catch (error) {
    dispatch(loginFailed());
  }
};
