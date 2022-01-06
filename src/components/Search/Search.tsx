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
    ElementsHolder
} from './Search.elements'

import {Suggestion} from '.././../features/termsSlice';
import { RootState } from '../../app/store';

import { useSelector } from 'react-redux';

import Element from '../UI/Element/Element';
import ChoosedElement from '../UI/ChoosedElement/ChoosedElement';

interface IProps {
    toggleSearchSet: React.Dispatch<React.SetStateAction<boolean>>
}

const Search: React.FC<IProps> = ({toggleSearchSet}) => {
    const {suggestions, choosed} = useSelector((state: RootState) => state.terms)

    const [showSuggestions, showSuggestionsSet] = React.useState<boolean>(false);
    const [terms, termsSet] = React.useState<string>('');

    const [text, textSet] = React.useState<string>('Search');

    const changeHanlder = (value: string) => {
        termsSet(value)
    }

    const blurHanlder = () => {
        // if(choosed.length !== 0) return;

        showSuggestionsSet(false)
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
            console.log('search')
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
                <ButtonHolder onClick={() => toggleSearchSet(false)}>
                    <ToggleButton/>
                </ButtonHolder>
            </Header>

            <SearchPlace>
                <SearchIcon/>
                <SearchField
                    placeholder={text}
                    value={terms}
                    onChange={(e) => changeHanlder(e.target.value)}
                    onFocus={() => showSuggestionsSet(true)}
                    onBlur={blurHanlder}
                />
            </SearchPlace>
            <ElementsHolder>

                <ChoosedList>
                    {choosed.map((c: Suggestion) => <ChoosedElement  key={c.value} element={c}/>)}
                </ChoosedList>

                {(showSuggestions || choosed.length === 0) && <SuggestionsList>
                    {terms.length > 0 && <Element key={terms} element={{
                        value: terms,
                        category: 'KEYWORD',
                        id: Math.random()
                    }} />}

                    {suggestions.map((s: Suggestion) => <Element key={s.value} element={s}/>)}
                </SuggestionsList> }
            </ElementsHolder>

            <Header isAbsolute={true}>
                <Button isCTA={false} onClick={() => toggleSearchSet(false)}>Clear search</Button>
                <Button isCTA={true}>Show Offers</Button>
            </Header>
        </SearchHolder>
    );
};

export default Search;