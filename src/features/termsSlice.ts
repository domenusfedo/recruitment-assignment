import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { app } from "../firebase";

export interface Suggestion {
    id: number,
    category: string,
    value: string
}

interface TermsState {
    suggestions: Suggestion[]
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
            category: 'React',
            value: 'Category'
        }, {
            id: 5,
            category: 'Skill',
            value: 'TypeScript'
        }, {
            id: 6,
            category: 'Company',
            value: 'NoA Ignite'
        }
    ]
}

const termsSlice = createSlice({
    name: 'terms',
    initialState,
    reducers: {
        //actions
    }
})

export const {
    //actions
} = termsSlice.actions

export default termsSlice.reducer;