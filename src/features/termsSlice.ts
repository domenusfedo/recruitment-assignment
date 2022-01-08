import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { app } from "../firebase";


export interface Suggestion {
    id: number,
    category: 'KEYWORD' | 'LOCATION' | 'SKILL' | 'CATEGORY' | 'COMPANY',
    value: string
}

export interface TermsState {
    suggestions: Suggestion[],
    choosed: Suggestion[],
    isLoading: boolean
}

const defaultValues: Suggestion[] = [
    {
        id: Math.random(),
        category: 'KEYWORD',
        value: ''
    }, {
        id: 1,
        category: 'LOCATION',
        value: 'Cracow'
    }, {
        id: 2,
        category: 'COMPANY',
        value: 'NoA Ignite'
    }, {
        id: 3,
        category: 'LOCATION',
        value: 'Warsaw'
    }, {
        id: 4,
        category: 'CATEGORY',
        value: 'React'
    }, {
        id: 5,
        category: 'LOCATION',
        value: 'Wroclaw'
    }, {
        id: 6,
        category: 'SKILL',
        value: 'TypeScript'
    }
]

const initialState: TermsState = {
    suggestions: defaultValues,
    choosed: [],
    isLoading: false
}

// export const fetchMoreData = createAsyncThunk`
// if(fetch === 0) => initialData
// ` 


const termsSlice = createSlice({
    name: 'terms',
    initialState,
    reducers: {
        addElementToChoosed: (state, action: PayloadAction<Suggestion>) => {
            let index = state.choosed.findIndex(c => c.value === action.payload.value);
            if (index !== -1) return;

            state.choosed = [...state.choosed, action.payload];
        },
        removeElementFromChoosed: (state, action: PayloadAction<Suggestion>) => {
            state.choosed = state.choosed.filter((e: Suggestion) => e.id !== action.payload.id);
        },
        addKeywordToList: (state, action: PayloadAction<string>) => {
            if (action.payload === state.suggestions[0].value) return;
            state.suggestions[0].value = action.payload;
            state.suggestions[0].id = Math.random();
        }
    }
})

export const {
    addElementToChoosed,
    removeElementFromChoosed,
    addKeywordToList
} = termsSlice.actions

export default termsSlice.reducer;