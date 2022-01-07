import React from 'react';
import { render, waitFor, screen, Suggestion} from '@testing-library/react';

import * as Redux from 'react-redux'

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../../app/store';
import { theme } from '../../theme/theme';
import {TermsState} from '../../features/termsSlice'

import Search from './Search';
import Element from '../UI/Element/Element';

const MockSearch = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Search/>
            </ThemeProvider>
        </Provider>
    )
}

describe('Search Component', () => {
    let component: any;
    let state: TermsState;

    beforeEach(() => {
        state = store.getState().terms;
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should render initial suggestions', async () => {
        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [true, jest.fn()])
        .mockImplementationOnce(() => ['' ,jest.fn()])
        .mockImplementationOnce(() => ['Search' ,jest.fn()])
        .mockImplementationOnce(() => [0 ,jest.fn()])

        jest.spyOn(React, 'useEffect')
        .mockImplementation(() => jest.fn())

        component = render(<MockSearch/>);

        const suggestions = await waitFor(() => screen.findByRole('contentinfo'));
        expect(suggestions.childElementCount).toBe(state.suggestions.length)

        suggestions.childNodes.forEach((e, idx) => {
            
            // const is = screen.getAllByRole('definition')
            // console.log(is)
            
            // render(<ThemeProvider theme={theme}><Element element={state.suggestions[idx]} isActive={false}/> </ThemeProvider>)
            // const should = screen.getAllByRole('definition')
            // console.log(should)
        })

    })
})