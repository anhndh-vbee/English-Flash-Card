import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import lessonSlice from './lessonSlice';
import cardSlice from './cardSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    lessons: lessonSlice,
    cards: cardSlice,
  },
});
