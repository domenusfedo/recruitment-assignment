import axios from 'axios';
import { store } from '../app/store';
import { TermsState, Suggestion, fetchMoreData, defaultValues } from './termsSlice';

import {
    addElementToChoosed,
    removeElementFromChoosed,
    addKeywordToList
} from './termsSlice'

describe('termsSlice sync actions', () => {
    let state: TermsState;

    const expectedValue: Suggestion = {
        category: 'CATEGORY',
        id: 1,
        value: 'Node.js'
    }

    beforeAll(() => {
        state = store.getState().terms
    })

    it('should add expectedValue to choosed', () => {
        const initialState = state;

        store.dispatch(addElementToChoosed(expectedValue));
        state = store.getState().terms

        expect(state.choosed[0]).not.toBe(null);
        expect(state.choosed[0].category).toBe(expectedValue.category);
        expect(state.choosed[0].id).toBe(expectedValue.id);
        expect(state.choosed[0].value).toBe(expectedValue.value);
        expect(state.choosed.length).not.toEqual(initialState.choosed.length)
    })

    it('should not add next element if id is the same', () => {
        const initialState = state;

        store.dispatch(addElementToChoosed(expectedValue));
        state = store.getState().terms;

        expect(state.choosed.length).toBe(initialState.choosed.length);
    })

    it('should remove expectedElement from choosed', () => {
        const initialState = state;

        store.dispatch(removeElementFromChoosed(expectedValue));
        state = store.getState().terms;

        const stateAfter = store.getState().terms.choosed;

        expect(stateAfter.length).not.toBe(initialState.choosed.length);
    })

    it('should modify postion 0', () => {
        const initialState = state;
        const userTerm = 'RandomString';

        store.dispatch(addKeywordToList({
            id: Math.random(),
            userInput: userTerm
        }));
        const stateAfter = store.getState().terms.suggestions;

        expect(stateAfter[0].value).toBe(userTerm);
        expect(stateAfter.length).toBe(initialState.suggestions.length);
    })
})

describe('termsSlice async actions', () => {
    let state: TermsState;

    const userInput = 'Reac';
    const userEmptyInput = '';

    it('should change suggestions', async () => {
        await store.dispatch(fetchMoreData(userInput));

        state = store.getState().terms;
        expect(state.suggestions[0].value).toBe(userInput)
        expect(state.suggestions[1].value).toBe('React')
    })

    it('should restore defaults, becuase user input is empty', () => {
        store.dispatch(fetchMoreData(userEmptyInput));

        state = store.getState().terms;
        expect(state.suggestions[1]).toMatchObject(defaultValues[1])
    })

    it('should restore defaults, because network error', () => {
        jest.spyOn(axios, 'get').mockRejectedValueOnce('Mocked Error');
        store.dispatch(fetchMoreData(userInput));

        state = store.getState().terms;
        expect(state.suggestions[1]).toMatchObject(defaultValues[1])
    })
})