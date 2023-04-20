import { createSlice } from '@reduxjs/toolkit';

const cardSlice = createSlice({
  name: 'card',
  initialState: {
    allCards: {
      listCards: null,
      loading: false,
      error: false,
    },
    message: '',
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
      state.allCards.loading = true;
    },
    getCardSuccess: (state) => {
      state.allCards.loading = false;
      state.allCards.error = false;
    },
    getCardFailed: (state, action) => {
      state.allCards.error = true;
      state.allCards.loading = false;
      state.message = action.payload;
    },
    updateCardStart: (state) => {
      state.allCards.loading = true;
    },
    updateCardSuccess: (state) => {
      state.allCards.loading = false;
      state.allCards.error = false;
    },
    updateCardFailed: (state, action) => {
      state.allCards.error = true;
      state.allCards.loading = false;
      state.message = action.payload;
    },
    deleteCardStart: (state) => {
      state.allCards.loading = true;
    },
    deleteCardSuccess: (state, action) => {
      state.allCards.loading = false;
      state.allCards.error = false;
      state.message = action.payload;
    },
    deleteCardFailed: (state, action) => {
      state.allCards.error = true;
      state.allCards.loading = false;
      state.message = action.payload;
    },
    addCardStart: (state) => {
      state.allCards.loading = true;
    },
    addCardSuccess: (state, action) => {
      state.allCards.loading = false;
      state.allCards.error = false;
      state.allCards.listCards.push(action.payload);
    },
    addCardFailed: (state, action) => {
      state.allCards.error = true;
      state.allCards.loading = false;
      state.message = action.payload;
    },
  },
});

export const {
  getAllCardStart,
  getAllCardSuccess,
  getAllCardFailed,
  getCardStart,
  getCardSuccess,
  getCardFailed,
  updateCardStart,
  updateCardSuccess,
  updateCardFailed,
  deleteCardStart,
  deleteCardSuccess,
  deleteCardFailed,
  addCardStart,
  addCardSuccess,
  addCardFailed,
} = cardSlice.actions;

export default cardSlice.reducer;
