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

import {addElementToChoosed, addKeywordToList, removeElementFromChoosed, Suggestion} from '.././../features/termsSlice';
import { RootState } from '../../app/store';

import { useSelector, useDispatch } from 'react-redux';

import Element from '../UI/Element/Element';
import ChoosedElement from '../UI/ChoosedElement/ChoosedElement';

enum Buttons {
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
    Enter = 'Enter',
}

interface IProps {
    
}

const Search: React.FC<IProps> = () => {
    const [showSuggestions, showSuggestionsSet] = React.useState<boolean>(false);
    const [terms, termsSet] = React.useState<string>('');
    
    const [text, textSet] = React.useState<string>('Search');
    const [cursor, cursorSet] = React.useState<number>(0);
    
    const {suggestions, choosed} = useSelector((state: RootState) => state.terms)
    const dispatch = useDispatch();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value === terms) return;
        if(cursor !== 0) return;
        termsSet(event.target.value)
    }

    const toggleHandler = () => {
        showSuggestionsSet(true)
    }

    const addElementHandler = (element: Suggestion) => {
        if(element.value === '') return;
        dispatch(addElementToChoosed(element))
    }

    const removeElementHandler = (element: Suggestion) => {
        dispatch(removeElementFromChoosed(element))
    }

    React.useEffect(() => {
        if(showSuggestions) {
            textSet('Skill, location, company')
        } else {
            textSet('Search')
        }
    }, [showSuggestions])

    // useEffect(() => {
    //     const fetchTimer = setTimeout(() => {
    //         // const filtered = suggestions.filter(e => {
    //             // Object.keys(e).some(k => e[k as keyof Suggestion ].toLowerCase().includes(terms));
    //         // })
            
    //         //fetching from API suggestionsSet
    //     }, 250)
    //     return () => {
    //         clearTimeout(fetchTimer)
    //     }
    // }, [terms])

    React.useEffect(() => {
        if(cursor !== 0) return;
        dispatch(addKeywordToList(terms))
    }, [terms, cursor])

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
                addElementHandler(suggestions[cursor])
                break;
            }
            default: {
                cursorSet(0)
                return
            }
        }
    }

    return (
        <SearchHolder>
            <Header isAbsolute={false}>
                <Text>Search</Text>
                <ButtonHolder>
                    <ToggleButton/>
                </ButtonHolder>
            </Header>

            <SearchPlace>
                <Row isHorizontal={true} isVisible={true} onClick={toggleHandler}>
                    <SearchField isActive={showSuggestions}>
                        {choosed.map((choosed: Suggestion, index) => <ChoosedElement key={choosed.value + index} element={choosed} removeElementHandler={removeElementHandler}/>)}
                        <Input onKeyDown={keyDownHandler}>
                            <SearchIcon/>
                            <SearchInput
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
                        {showSuggestions && suggestions.map((suggestion, index) => (
                                <div key={suggestion.value + index} onClick={() => addElementHandler(suggestion)}> 
                                    {suggestion.value !== '' ? <Element element={suggestion} isActive={index === cursor}/> : null}
                                </div>
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
