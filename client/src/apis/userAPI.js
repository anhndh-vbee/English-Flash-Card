import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "../redux/authSlice";
import DOMAIN from '../config';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    console.log(user);
    try {
        const res = await axios.post(`${DOMAIN}/auth/login`, user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed())
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post(`${DOMAIN}/auth/register`, user)
        dispatch(registerSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(registerFailed());
    }
}
