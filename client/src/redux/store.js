import { configureStore } from '@reduxjs/toolkit'

// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

import authSlice from './authSlice'
import lessonSlice from './lessonSlice'
import cardSlice from './cardSlice'

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// }

// const rootReducer = combineReducers({
//     auth: authSlice,
//     lessons: lessonSlice,
//     cards: cardSlice
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// })

export const store = configureStore({
    reducer: {
        auth: authSlice,
        lessons: lessonSlice,
        cards: cardSlice
    }
})

// export const persistor = persistStore(store);
