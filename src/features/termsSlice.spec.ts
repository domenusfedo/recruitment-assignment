import { store } from '../app/store';
import { TermsState, Suggestion } from './termsSlice';

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

        store.dispatch(addKeywordToList(userTerm));
        const stateAfter = store.getState().terms.suggestions;

        expect(stateAfter[0].value).toBe(userTerm);
        expect(stateAfter.length).toBe(initialState.suggestions.length);
    })
})