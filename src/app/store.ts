import { configureStore } from '@reduxjs/toolkit'

import termsReducer from '../features/termsSlice';

export const store = configureStore({
    reducer: {
        terms: termsReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;