import React from 'react';
import { render, waitFor, screen, fireEvent} from '@testing-library/react';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../../../app/store';
import { theme } from '../../../theme/theme';
import {Suggestion, TermsState} from '../../../features/termsSlice'

import ChoosedElement from './ChoosedElement'


const mockedReduxFunction = jest.fn();

// const MockChoosedElement = (element: Suggestion, isActive: boolean) => {
//     return (
//         <Provider store={store}>
//             <ThemeProvider theme={theme}>
//                 <ChoosedElement element={element} removeElementHandler={mockedReduxFunction}/>
//             </ThemeProvider>
//         </Provider>
//     )
// }

describe('ChoosedElement Component', () => {
    let component: any;
    let state: TermsState;

    const expectedValue: Suggestion = {
        category: 'CATEGORY',
        id: 1,
        value: 'Node.js'
    }
    
    it('should render category in upper case', async () => {
        component = render(<Provider store={store}>
            <ThemeProvider theme={theme}>
                <ChoosedElement element={expectedValue} removeElementHandler={mockedReduxFunction}/>
            </ThemeProvider>
        </Provider>);

        state = await store.getState().terms;

        const title = await waitFor(() => screen.findByRole('definition'));
        const category = await waitFor(() => screen.findByRole('content-info'));
        const button = await waitFor(() => screen.findByRole('button'));

        fireEvent.click(button, expectedValue);
        expect(mockedReduxFunction).toBeCalled();

        expect(title).toBeInTheDocument();
        expect(category).toBeInTheDocument();

        expect(category).toHaveTextContent(expectedValue.category);
        expect(title).toHaveTextContent(expectedValue.value);
    })
})