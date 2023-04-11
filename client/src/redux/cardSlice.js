import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        allCards: {
            listCards: null,
            loading: false,
            error: false
        },
        cardToTake: {
            card: null,
            loading: false,
            error: false
        },
        message: ""
    },
    reducers: {
        getAllCardStart: (state) => {
            state.allCards.loading = true;
        },
        getAllCardSuccess: (state, action) => {
            state.allCards.loading = false;
            state.allCards.error = false;
            state.allCards.listCards = action.payload;
        },
        getAllCardFailed: (state, action) => {
            state.allCards.error = true;
            state.allCards.loading = false;
            state.message = action.payload;
        },
        getCardStart: (state) => {
            state.cardToTake.loading = true;
        },
        getCardSuccess: (state, action) => {
            state.cardToTake.loading = false;
            state.cardToTake.error = false;
            state.cardToTake.card = action.payload;
        },
        getCardFailed: (state, action) => {
            state.cardToTake.error = true;
            state.cardToTake.loading = false;
            state.message = action.payload;
        },
        updateCardStart: (state) => {
            state.cardToTake.loading = true;
        },
        updateCardSuccess: (state, action) => {
            state.cardToTake.loading = false;
            state.cardToTake.error = false;
            state.cardToTake.card = action.payload;
        },
        updateCardFailed: (state, action) => {
            state.cardToTake.error = true;
            state.cardToTake.loading = false;
            state.message = action.payload;
        },
        deleteCardStart: (state) => {
            state.allCards.loading = true;
        },
        deleteCardSuccess: (state, action) => {
            state.allCards.loading = false;
            state.allCards.error = false;
            state.message = action.payload;
            // state.allCards.listCards = state.allCards.listCards.filter((card, index) => index !== action.payload)
        },
        deleteCardFailed: (state, action) => {
            state.allCards.error = true;
            state.allCards.loading = false;
            state.message = action.payload;
        },
        addCardStart: (state) => {
            state.cardToTake.loading = true;
        },
        addCardSuccess: (state, action) => {
            state.cardToTake.loading = false;
            state.cardToTake.error = false;
            state.cardToTake.card = action.payload;
        },
        addCardFailed: (state, action) => {
            state.cardToTake.error = true;
            state.cardToTake.loading = false;
            state.message = action.payload;
        }
    }
})

export const {
    getAllCardStart, getAllCardSuccess, getAllCardFailed,
    getCardStart, getCardSuccess, getCardFailed,
    updateCardStart, updateCardSuccess, updateCardFailed,
    deleteCardStart, deleteCardSuccess, deleteCardFailed,
    addCardStart, addCardSuccess, addCardFailed
} = cardSlice.actions;

export default cardSlice.reducer;
