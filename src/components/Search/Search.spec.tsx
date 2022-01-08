import React from 'react';
import { render, waitFor, screen, fireEvent} from '@testing-library/react';

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

describe('Navigation behaviour', () => {
    let component: any;
    let state: TermsState;

    it("should toggle suggestions", async () => {
        component = render(<MockSearch/>);

        const input = await waitFor(() => screen.findByRole('presentation'));
        
        await fireEvent.click(input);

        const suggestions = await waitFor(() => screen.findByRole('contentinfo'));

        expect(suggestions).toBeInTheDocument();
    })

    it("should change cursor property to first element(userInput is not renered) and set element as active", async () => {
        component = render(<MockSearch/>);
        state = store.getState().terms;
        
        const input = await waitFor(() => screen.findByRole('presentation'));
        
        await fireEvent.click(input);

        await fireEvent.keyDown(input, {
            key: "ArrowDown",
            code: "ArrowDown",
            keyCode: 13,
            charCode: 13
        })

        const parents = await waitFor(() => screen.findAllByRole('group'));

        expect(parents[0]).toHaveStyle('border: 1px solid #464646');
        expect(parents[1]).not.toHaveStyle('border: 1px solid #464646');
    })

    it("should change cursor to first element after increasing it twice", async () => {
        component = render(<MockSearch/>);
        state = store.getState().terms;
        
        const input = await waitFor(() => screen.findByRole('presentation'));
        
        await fireEvent.click(input);

        await fireEvent.keyDown(input, {
            key: "ArrowDown",
            code: "ArrowDown",
            keyCode: 13,
            charCode: 13
        })

        await fireEvent.keyDown(input, {
            key: "ArrowDown",
            code: "ArrowDown",
            keyCode: 13,
            charCode: 13
        })

        await fireEvent.keyDown(input, {
            key: "ArrowUp",
            code: "ArrowUp",
            keyCode: 38,
            charCode: 38
        })

        const parents = await waitFor(() => screen.findAllByRole('group'));

        expect(parents[0]).toHaveStyle('border: 1px solid #464646');
    })

    it("should add first element from defaultValues: Redux to choosed when Enter was clicked", async () => {
        component = render(<MockSearch/>);
        state = store.getState().terms;

        const initialChoosed = store.getState().terms.choosed;
        
        const input = await waitFor(() => screen.findByRole('presentation'));
        
        await fireEvent.click(input);

        await fireEvent.keyDown(input, {
            key: "ArrowDown",
            code: "ArrowDown",
            keyCode: 30,
            charCode: 30
        })

        await fireEvent.keyDown(input, {
            key: "Enter",
            code: "Enter",
            keyCode: 13,
            charCode: 13
        })

        state = store.getState().terms;
        const afterChoosed = store.getState().terms.choosed;

        expect(afterChoosed.length).toBeGreaterThan(initialChoosed.length);
        expect(afterChoosed[0].value).toBe('Cracow');
        expect(afterChoosed[0].category).toBe('LOCATION');
    })

    it("should remove element from choosed", async () => {
        component = render(<MockSearch/>);
        state = store.getState().terms;

        const initialChoosed = store.getState().terms.choosed;
        
        const input = await waitFor(() => screen.findByRole('presentation'));
        await fireEvent.click(input);
        
        const buttons = await waitFor(() => screen.findAllByRole('button'));

        await fireEvent.click(buttons[0]);

        const afterChoosed = store.getState().terms.choosed;

        expect(afterChoosed.length).toBeLessThan(initialChoosed.length)
    })

    it("should stop increasing cursor if array has no more elements", async () => {
    const moreThanExpectedLength = store.getState().terms.suggestions;

        component = render(<MockSearch/>);
        state = store.getState().terms;

        const input = await waitFor(() => screen.findByRole('presentation'));
        
        await fireEvent.click(input);
        const parents = await waitFor(() => screen.findAllByRole('group'));

        moreThanExpectedLength.forEach(() => { //we are forcing to press ArrowDown more than amount of rendered elements
            fireEvent.keyDown(input, {
                key: "ArrowDown",
                code: "ArrowDown",
                keyCode: 13,
                charCode: 13
            })
        })

        const combinedValues = state.suggestions[6].value + state.suggestions[6].category;

        expect(parents[moreThanExpectedLength.length - 2].textContent).toBe(combinedValues);
        expect(parents[moreThanExpectedLength.length - 2]).toHaveStyle('border: 1px solid #464646');//-2 becuase first element will not render cos` we don't have user's input and array start from 0
    })

    it("should make user's input visible and have user's input", async () => {
        //check if terms change will display user's input field
    })
})

describe('Mocked Search Component', () => {
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
        .mockImplementation(() => jest.fn()) //i am not sure why this is not working when i am trying to mock disptach here

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