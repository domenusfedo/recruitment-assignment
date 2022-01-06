import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { app } from "../firebase";

export interface Suggestion {
    id: number,
    category: string,
    value: string
}

interface TermsState {
    suggestions: Suggestion[],
    choosed: Suggestion[]
}

const initialState: TermsState = {
    suggestions: [
        {
            id: 1,
            category: 'Location',
            value: 'Cracow'
        }, {
            id: 2,
            category: 'Location',
            value: 'Warsaw'
        }, {
            id: 3,
            category: 'Location',
            value: 'Wroclaw'
        }, {
            id: 4,
            category: 'Category',
            value: 'React'
        }, {
            id: 5,
            category: 'Skill',
            value: 'TypeScript'
        }, {
            id: 6,
            category: 'Company',
            value: 'NoA Ignite'
        }
    ],
    choosed: []
}

const termsSlice = createSlice({
    name: 'terms',
    initialState,
    reducers: {
        addElementToChoosed: (state, action: PayloadAction<Suggestion>) => {
            state.choosed = [...state.choosed, action.payload]
        },
        removeElementFromChoosed: (state, action: PayloadAction<Suggestion>) => {
            state.choosed = state.choosed.filter((e: Suggestion) => e.id !== action.payload.id)
        }
    }
})

export const {
    addElementToChoosed,
    removeElementFromChoosed
} = termsSlice.actions

export default termsSlice.reducer;