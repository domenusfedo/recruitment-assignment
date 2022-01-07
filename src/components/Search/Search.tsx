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
    ChoosedList,
    Header,
    Button,
    Input,
    ElementsHolder,
    Row,
    SearchInput
} from './Search.elements'

import {addElementToChoosed, removeElementFromChoosed, Suggestion} from '.././../features/termsSlice';
import { RootState } from '../../app/store';

import { useSelector, useDispatch } from 'react-redux';

import Element from '../UI/Element/Element';
import ChoosedElement from '../UI/ChoosedElement/ChoosedElement';

interface IProps {
    
}

const Search: React.FC<IProps> = () => {
    const dispatch = useDispatch();

    const {suggestions, choosed} = useSelector((state: RootState) => state.terms)

    const [showSuggestions, showSuggestionsSet] = React.useState<boolean>(false);
    const [terms, termsSet] = React.useState<string>('');

    const [text, textSet] = React.useState<string>('Search');

    const changeHandler = (value: string) => {
        termsSet(value)
    }

    const toggleHandler = () => {
        showSuggestionsSet(!showSuggestions)
    }

    const addElementHandler = (element: Suggestion) => {
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

    useEffect(() => {
        const fetchTimer = setTimeout(() => {
            // const filtered = suggestions.filter(e => {
                // Object.keys(e).some(k => e[k as keyof Suggestion ].toLowerCase().includes(terms));
            // })
            
            //fetching from API suggestionsSet
        }, 250)
        return () => {
            clearTimeout(fetchTimer)
        }
    }, [terms])

    return (
        <SearchHolder>
            <Header isAbsolute={false}>
                <Text>Search</Text>
                <ButtonHolder>
                    <ToggleButton/>
                </ButtonHolder>
            </Header>


            <SearchPlace onFocus={toggleHandler}>
                <Row isHorizontal={true} isVisible={true}>
                    <SearchField isActive={showSuggestions}>
                    {choosed.map((c: Suggestion) => <ChoosedElement key={c.value} element={c} removeElementHandler={removeElementHandler}/>)}
                        <Input>
                            <SearchIcon/>
                            <SearchInput
                                placeholder={text}
                                value={terms}
                                onChange={(e) => changeHandler(e.target.value)}
                            />
                        </Input>
                    </SearchField>
                </Row>
                <Row isHorizontal={false} isVisible={showSuggestions}>
                    <SuggestionsList>
                        {terms.length > 0 &&  (
                            <div key={terms} onClick={() => addElementHandler({
                                    id: Math.random(),
                                    category: 'KEYWORD',
                                    value: terms
                            })}>
                                <Element element={{
                                    id: Math.random(),
                                    category: 'KEYWORD',
                                    value: terms
                                }}/>
                            </div>
                        )
                            }
                        {suggestions.map(e => (
                            <div key={e.value} onClick={() => addElementHandler(e)}>
                                <Element element={e}/>
                            </div>
                        ))}
                    </SuggestionsList>
                </Row>
            </SearchPlace>
            
            <ElementsHolder>
                {/* <ChoosedList> */}
                    {/* {choosed.map((c: Suggestion) => <ChoosedElement key={c.value} element={c} removeElementHandler={removeElementHandler}/>)} */}
                {/* </ChoosedList> */}
                
            </ElementsHolder>

            <Header isAbsolute={true}>
                <Button isCTA={false}>Clear search</Button>
                <Button isCTA={true}>Show Offers</Button>
            </Header>
        </SearchHolder>
    );
};

export default Search;