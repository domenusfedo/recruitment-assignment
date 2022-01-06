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
    SuggestionsListItem,
    Header,
    Row,
    Title,
    Category,
    Image,
    Button
} from './Search.elements'

import {Suggestion} from '.././../features/termsSlice';
import { RootState } from '../../app/store';

import { useSelector } from 'react-redux';

interface IProps {
    toggleSearchSet: React.Dispatch<React.SetStateAction<boolean>>
}

const Search: React.FC<IProps> = ({toggleSearchSet}) => {
    const {suggestions} = useSelector((state: RootState) => state.terms)

    const [showSuggestions, showSuggestionsSet] = React.useState<boolean>(false);
    const [terms, termsSet] = React.useState<string>('');

    const [text, textSet] = React.useState<string>('Search');

    const changeHanlder = (value: string) => {
        termsSet(value)
    }

    const addNewKeyword = () => {
        //dispatch locally new 
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
                    onBlur={() => showSuggestionsSet(false)}
                />
            </SearchPlace>
            {/* Choosed Items */}
            
           {showSuggestions && (
                <SuggestionsList>
                {terms.length > 0 && (
                    <SuggestionsListItem key={321412}>
                        <Row>
                            <Image/>
                        </Row>
                        <Row>
                            <Title>{terms}</Title>
                            <Category>KEYWORD</Category>
                        </Row>
                    </SuggestionsListItem>)}
                {suggestions.length > 0 && (
                    suggestions.map((s: Suggestion) => <SuggestionsListItem key={s.id}>
                        <Row>
                            <Image/>
                        </Row>
                        <Row>
                            <Title>{s.value}</Title>
                            <Category>{s.category.toUpperCase()}</Category>
                        </Row>
                    </SuggestionsListItem>)
                )}
            </SuggestionsList>
           )}

            <Header isAbsolute={true}>
                <Button isCTA={false}>Clear search</Button>
                <Button isCTA={true}>Show Offers</Button>
            </Header>
        </SearchHolder>
    );
};

export default Search;