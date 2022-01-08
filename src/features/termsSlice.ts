import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
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

interface AddSuggestionsAction {
    suggestions: Suggestion[],
    userInput: string
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

export const fetchMoreData = createAsyncThunk(
    'user/getUser',
    async (args: string, { dispatch }) => {
        // setLoading(true);

        if (args === '') {
            setLoading(false);
            dispatch(addDefaultSuggestions())
            return;
        }

        dispatch(testSortArray(args))


        // try {
        //     const res = await axios.get('fake_API_URL'); //will fetch all suggestions
        //     //filter sort

        //     addSuggestions([])

        //     if (!res) { //length
        //         dispatch(addDefaultSuggestions())
        //     }
        //     setLoading(false);
        // } catch (err) {
        //     dispatch(addDefaultSuggestions())
        //     setLoading(false);
        // }
    }
)


const termsSlice = createSlice({
    name: 'terms',
    initialState,
    reducers: {
        addElementToChoosed: (state, action: PayloadAction<Suggestion>) => {
            let index = state.choosed.findIndex(choosed => choosed.id === action.payload.id);
            if (index !== -1) return;

            state.choosed = [...state.choosed, action.payload];
        },
        removeElementFromChoosed: (state, action: PayloadAction<Suggestion>) => {
            state.choosed = state.choosed.filter((choosed: Suggestion) => choosed.id !== action.payload.id);
        },
        addKeywordToList: (state, action: PayloadAction<string>) => {
            if (action.payload === state.suggestions[0].value) return;
            state.suggestions[0].value = action.payload;
            state.suggestions[0].id = Math.random();
        },
        addSuggestions: (state, action: PayloadAction<AddSuggestionsAction>) => {
            const userSuggestion = defaultValues[0];
            userSuggestion.value = action.payload.userInput;

            state.suggestions = [userSuggestion, ...action.payload.suggestions]
        },
        addDefaultSuggestions: (state) => {
            state.suggestions = defaultValues;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        //Will be removed
        testSortArray: (state, action: PayloadAction<string>) => {
            state.suggestions = state.suggestions.filter(element => element.value.includes(action.payload))
        }
    }
})

export const {
    addElementToChoosed,
    removeElementFromChoosed,
    addKeywordToList,
    addSuggestions,
    addDefaultSuggestions,
    setLoading,
    testSortArray
} = termsSlice.actions

export default termsSlice.reducer;