import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';


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

export const defaultValues: Suggestion[] = [
    {
        id: Math.random(),
        category: 'KEYWORD',
        value: ''
    }, {
        id: 1,
        category: 'LOCATION',
        value: 'Cracow'
    }, {
        id: 7,
        category: 'COMPANY',
        value: 'NoA Ignite'
    }, {
        id: 3,
        category: 'LOCATION',
        value: 'Warsaw'
    }, {
        id: 19,
        category: 'CATEGORY',
        value: 'React'
    }, {
        id: 5,
        category: 'LOCATION',
        value: 'Wroclaw'
    }, {
        id: 14,
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
        dispatch(setLoading(true));

        if (args === '') {
            dispatch(setLoading(false));
            dispatch(addDefaultSuggestions());
            return;
        }

        try {
            const res = await axios.get('http://localhost:8000/data');
            const fetchedData: Suggestion[] = res.data;


            dispatch(setLoading(false));

            //const filteredArray: Suggestion[] = fetchedData.filter(element => element.value.toLowerCase().includes(args.toLowerCase()));
            const filteredArray: Suggestion[] = fetchedData.filter(element => element.value.startsWith(args));

            // console.log(filteredArray)

            dispatch(addSuggestions({
                userInput: args,
                suggestions: filteredArray
            }));

        } catch (err) {
            dispatch(addDefaultSuggestions())
            setLoading(false);
        }
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
            const newDefaultuser: Suggestion = {
                ...defaultValues[0],
                value: action.payload.userInput
            }
            state.suggestions = [{ ...newDefaultuser }, ...action.payload.suggestions]
        },
        addDefaultSuggestions: (state) => {
            state.suggestions = defaultValues;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
})

export const {
    addElementToChoosed,
    removeElementFromChoosed,
    addKeywordToList,
    addSuggestions,
    addDefaultSuggestions,
    setLoading
} = termsSlice.actions

export default termsSlice.reducer;