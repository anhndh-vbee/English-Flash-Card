import axios from 'axios';
import DOMAIN from '../config';
import { addCardFailed, addCardStart, addCardSuccess, deleteCardFailed, deleteCardStart, deleteCardSuccess, getAllCardFailed, getAllCardStart, getAllCardSuccess, getCardFailed, getCardStart, getCardSuccess, updateCardFailed, updateCardStart, updateCardSuccess } from '../redux/cardSlice';

export const getAllCards = async (accessToken, dispatch) => {
    dispatch(getAllCardStart());
    try {
        const res = await axios.get(`${DOMAIN}/card/get-all-cards`, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(getAllCardSuccess(res.data));
    } catch (error) {
        dispatch(getAllCardFailed());
    }
}

export const getCard = async (accessToken, dispatch, id) => {
    dispatch(getCardStart());
    try {
        const res = await axios.get(`${DOMAIN}/card/get-card/${id}`, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(getCardSuccess(res.data));
    } catch (error) {
        dispatch(getCardFailed());
    }
}

export const addCard = async (accessToken, dispatch, card) => {
    dispatch(addCardStart());
    try {
        const res = await axios.post(`${DOMAIN}/card/add-card`, card, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(addCardSuccess(res.data));
        // dispatch(getAllCards());
    } catch (error) {
        dispatch(addCardFailed());
    }
}

export const updateCard = async (accessToken, dispatch, id, card) => {
    dispatch(updateCardStart());
    try {
        const res = await axios.put(`${DOMAIN}/card/update-card/${id}`, card, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(updateCardSuccess(res.data));
    } catch (error) {
        dispatch(updateCardFailed());
    }
}

export const deleteCard = async (accessToken, dispatch, id) => {
    dispatch(deleteCardStart());
    try {
        const res = await axios.delete(`${DOMAIN}/card/delete-card/${id}`, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(deleteCardSuccess(res.data));
        // dispatch(getAllCards())
    } catch (error) {
        dispatch(deleteCardFailed());
    }
}
