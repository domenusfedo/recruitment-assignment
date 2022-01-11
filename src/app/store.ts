import { configureStore } from '@reduxjs/toolkit'

import termsReducer from '../features/termsSlice';

export const store = configureStore({ //store created by function to have clear store in tests
    reducer: {
        terms: termsReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;