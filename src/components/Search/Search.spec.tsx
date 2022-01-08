import React from 'react';
import { render, waitFor, screen, Suggestion, fireEvent} from '@testing-library/react';

import * as Redux from 'react-redux'

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../../app/store';
import { theme } from '../../theme/theme';
import {addKeywordToList, TermsState} from '../../features/termsSlice'

import Search from './Search';

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

    // beforeEach(() => {
    //     state = store.getState().terms;
    // })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should toggle suggestions", async () => {
        component = render(<MockSearch/>);

        const input = await waitFor(() => screen.findByRole('presentation'));
        
        await fireEvent.click(input);


    })

    it("should change cursor property to first element(userInput is not renered) and set element as active", async () => {
        component = render(<MockSearch/>);
        state = store.getState().terms;
        
        const input = await waitFor(() => screen.findByRole('presentation'));
        
        await fireEvent.click(input);

        const suggestions = await waitFor(() => screen.findByRole('contentinfo'));

        expect(suggestions).toBeInTheDocument();
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
        state = store.getState().terms;

        const suggestions = await waitFor(() => screen.findByRole('contentinfo'));
        expect(suggestions.childElementCount).toBe(state.suggestions.length)

        suggestions.childNodes.forEach((element, index) => {
            if(index === 0) return; //skipping element 0 becuase it's user input //This element is not rendered when there is no term

            const combinedValues = state.suggestions[index].value + state.suggestions[index].category;
            expect(element.textContent).toBe(combinedValues)
        })
    })

    it("should render extra element with user's input", async () => {
        const userInputMocked = 'TEST';

        jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [true, jest.fn()])
        .mockImplementationOnce(() => [userInputMocked ,jest.fn()])
        .mockImplementationOnce(() => ['Search' ,jest.fn()])
        .mockImplementationOnce(() => [0 ,jest.fn()])

        jest.spyOn(React, 'useEffect')
        .mockImplementation(() => jest.fn()) //idk why this is not working when i am trying to mock disptach here

        store.dispatch(addKeywordToList(userInputMocked)) //Manually mocked dispatch 'in useEffect'

        component = render(<MockSearch/>);
        state = store.getState().terms;
        
        const input = await waitFor(() => screen.findByRole('presentation'));
        const suggestions = await waitFor(() => screen.findByRole('contentinfo'));
   
        expect(input.getAttribute('value')).toBe(userInputMocked);
        
        const combinedValues = state.suggestions[0].value + state.suggestions[0].category;
        expect(suggestions.childNodes[0].textContent).toBe(combinedValues);
    })
})