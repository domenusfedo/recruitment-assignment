import React from 'react';
import { render, waitFor, screen} from '@testing-library/react';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../../../app/store';
import { theme } from '../../../theme/theme';
import {Suggestion, TermsState} from '../../../features/termsSlice'

import Element from './Element'


// const MockElement = (element: Suggestion, isActive: boolean) => {
//     return (
//         <Provider store={store}>
//             <ThemeProvider theme={theme}>
//                 <Element element={element} isActive={isActive}/>
//             </ThemeProvider>
//         </Provider>
//     )
// }

describe('Element Component', () => {
    let component: any;
    let state: TermsState;

    const expectedValue: Suggestion = {
        category: 'CATEGORY',
        id: 1,
        value: 'Node.js'
    }

    beforeEach(() => {
        state = store.getState().terms;
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should render expected elements', async () => {
        component = render(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Element element={expectedValue} isActive={false}/>
                </ThemeProvider>
            </Provider>
        );

        state = await store.getState().terms;

        const parent = await waitFor(() => screen.findByRole('group'));
        const title = await waitFor(() => screen.findByRole('definition'));
        const category = await waitFor(() => screen.findByRole('content-info'));

        expect(parent).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(category).toBeInTheDocument();

        expect(title).toHaveTextContent(expectedValue.value)
        expect(category).toHaveTextContent(expectedValue.category)
    })

    it('should not have border', async () => {
        component = render(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Element element={expectedValue} isActive={false}/>
                </ThemeProvider>
            </Provider>
        );
        state = await store.getState().terms;

        const parent = await waitFor(() => screen.findByRole('group'));
        expect(parent).toHaveStyle('border: 1px solid transparent');
    })

    it('should have border', async () => {
        component = render(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Element element={expectedValue} isActive={true}/>
                </ThemeProvider>
            </Provider>
        );
        state = await store.getState().terms;

        const parent = await waitFor(() => screen.findByRole('group'));
        expect(parent).toHaveStyle('border: 1px solid #464646');
    })
})