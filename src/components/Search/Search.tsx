import React from 'react';

import {
    SearchHolder,
    Text,
    ButtonHolder,
    ToggleButton,
    SearchPlace,
    SearchField,
    SearchIcon,
    SuggestionsList,
    Header,
    Button,
    Input,
    Row,
    SearchInput
} from './Search.elements'

import {addElementToChoosed, addKeywordToList, fetchMoreData, Suggestion} from '.././../features/termsSlice';
import { RootState } from '../../app/store';

import {useSelector, useDispatch} from 'react-redux';

import Element from '../UI/Element/Element';
import ChoosedElement from '../UI/ChoosedElement/ChoosedElement';

enum Buttons {
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
    Enter = 'Enter',
}

const Search: React.FC = () => {
    const [showSuggestions, showSuggestionsSet] = React.useState<boolean>(false);
    const [terms, termsSet] = React.useState<string>('');
    const [suggestionText, suggestionTextSet] = React.useState<string>(''); //This will be in seperate Component
    const [cursor, cursorSet] = React.useState<number>(0); //This will be in custom hook
    const [text, textSet] = React.useState<string>('Search');
    
    const suggestionRef = React.useRef<HTMLInputElement>(null);

    const {suggestions, choosed, isLoading} = useSelector((state: RootState) => state.terms)
    const dispatch = useDispatch();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value === terms) return;
        if(cursor !== 0) return;

        termsSet(event.target.value)
    }

    React.useEffect(() => {
        if(cursor !== 0) return;
        dispatch(addKeywordToList({
            userInput: terms,
            id: Math.random()
        }))

        const fetchTimer = setTimeout(() => {
            dispatch(fetchMoreData(terms))
        }, 250)

        return () => {
            clearTimeout(fetchTimer)
        }
    }, [terms, cursor])

    React.useEffect(() => {
        termsSet(suggestions[cursor].value)
    }, [cursor])

    React.useEffect(() => {
        let transformedSuggestion;
        let finalOutput;

        if(isLoading) {
            suggestionTextSet('')
            return;
        }

        if(!suggestions[1]) {
            //suggestionRef.current!.value = terms ??
            suggestionTextSet(terms)
        } else {
            transformedSuggestion = suggestions[1].value.slice(terms.length);
            finalOutput = terms + transformedSuggestion;
            suggestionTextSet(finalOutput)
        }
    }, [suggestions])

    //This will be in custom hook
    const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch(event.code) {
            case Buttons.ArrowUp : {
                if(cursor === 0) return;
                cursorSet(cursor - 1)
                break;
            }
            case Buttons.ArrowDown : {
                if(cursor === (suggestions.length - 1)) return;
                cursorSet(cursor + 1)
                break;
            }
            case Buttons.Enter : {
                if(suggestions[cursor].value === '') return;
                dispatch(addElementToChoosed(suggestions[cursor]))
                break;
            }
            default: {
                cursorSet(0)
                return;
            }
        }
    }
    //This will be in custom hook

    return (
        <SearchHolder>
            <Header isAbsolute={false}>
                <Text>Search</Text>
                <ButtonHolder>
                    <ToggleButton/>
                </ButtonHolder>
            </Header>

            <SearchPlace>
                <Row isHorizontal={true} isVisible={true} onClick={() => showSuggestionsSet(true)}>
                    <SearchField isActive={showSuggestions}>
                        {choosed.map((choosed: Suggestion, index) => <ChoosedElement key={choosed.value + index} element={choosed} />)}
                        
                        <Input onKeyDown={keyDownHandler} onBlur={() => textSet('Search')} onFocus={() => textSet('Skill, location, company')}>
                                <SearchIcon/>
                                {(terms !== '' && cursor === 0) && <SearchInput isMain={false} readOnly value={suggestionText} ref={suggestionRef}/>}
                                <SearchInput
                                        isMain={true}
                                        role='presentation'
                                        placeholder={text}
                                        value={terms}
                                        onChange={(event) => changeHandler(event)}
                                        onBlur={() => cursorSet(0)}
                                /> 
                        </Input>
                    </SearchField>
                </Row>

                <Row isHorizontal={false} isVisible={showSuggestions}>
                    <SuggestionsList role='contentinfo'>
                        {showSuggestions && suggestions.map((suggestion, index) => (// Should be a button
                                    suggestion.value !== '' ? <Element key={suggestion.value + index} element={suggestion} data-value={suggestion.value} isActive={index === cursor}/> : null
                            )
                        )}
                    </SuggestionsList>
                </Row>
            </SearchPlace>

            <Header isAbsolute={true}>
                <Button isCTA={false}>Clear search</Button>
                <Button isCTA={true}>Show Offers</Button>
            </Header>
        </SearchHolder>
    );
};

export default Search;