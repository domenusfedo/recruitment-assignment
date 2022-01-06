import React, { useEffect } from 'react';

import {
    SearchField,
    SuggestionsList,
    SuggestionsListItem
} from './Search.elements'

import {Suggestion} from '.././../features/termsSlice';
import { RootState } from '../../app/store';

import { useSelector } from 'react-redux';

interface IProps {
    
}

const Search: React.FC<IProps> = () => {
    const {suggestions} = useSelector((state: RootState) => state.terms)

    const [showSuggestions, showSuggestionsSet] = React.useState<boolean>(false);
    const [terms, termsSet] = React.useState<string>('');

    const changeHanlder = (value: string) => {
        termsSet(value)
    }

    useEffect(() => {
        const fetchTimer = setTimeout(() => {
            //console.log('search')
            //fetching from API suggestionsSet
        }, 500)
        return () => {
            clearTimeout(fetchTimer)
        }
    }, [terms])

    return (
        <>
            <SearchField
                placeholder='Search...'
                value={terms}
                onChange={(e) => changeHanlder(e.target.value)}
                onFocus={() => showSuggestionsSet(true)}
                onBlur={() => showSuggestionsSet(false)}
            />
            <SuggestionsList>
                {showSuggestions && (
                    suggestions.map((s: Suggestion) => <SuggestionsListItem key={s.id}>{s.value}</SuggestionsListItem>)
                )}
            </SuggestionsList>
        </>
    );
};

export default Search;