import React, { useEffect } from 'react';

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
    const dispatch = useDispatch();

    const {suggestions, choosed} = useSelector((state: RootState) => state.terms)

    const [showSuggestions, showSuggestionsSet] = React.useState<boolean>(false);
    const [terms, termsSet] = React.useState<string>('');

    const [text, textSet] = React.useState<string>('Search');
    const [cursor, cursorSet] = React.useState<number>(0);

    const changeHandler = (value: string) => {
        if(cursor !== 0) return;
        termsSet(value)
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

    useEffect(() => {
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

    useEffect(() => {
        if(cursor !== 0) return;
        dispatch(addKeywordToList(terms))
    }, [terms])

    useEffect(() => {
        termsSet(suggestions[cursor].value)
    }, [cursor])

    const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch(e.code) {
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
                    {choosed.map((c: Suggestion) => <ChoosedElement key={c.value} element={c} removeElementHandler={removeElementHandler}/>)}
                        <Input onKeyDown={keyDownHandler}>
                            <SearchIcon/>
                            <SearchInput
                                placeholder={text}
                                value={terms}
                                onChange={(e) => changeHandler(e.target.value)}
                                onBlur={() => cursorSet(0)}
                            />
                        </Input>
                    </SearchField>
                </Row>
                <Row isHorizontal={false} isVisible={showSuggestions}>
                    <SuggestionsList>
                        {showSuggestions && suggestions.map((e, idx) => (
                                <div key={e.value} onClick={() => addElementHandler(e)}> 
                                    {e.value !== '' ? <Element element={e} isActive={idx === cursor}/> : null}
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
