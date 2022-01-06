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

    const addNewKeyword = () => {
        //dispatch locally new 
    }

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
        <>
            {/* Choosed Items */}
            <SearchField
                placeholder='Search...'
                value={terms}
                onChange={(e) => changeHanlder(e.target.value)}
                onFocus={() => showSuggestionsSet(true)}
                onBlur={() => showSuggestionsSet(false)}
            />
            <SuggestionsList>
                {(suggestions.length > 0  && showSuggestions) && (
                    suggestions.map((s: Suggestion) => <SuggestionsListItem key={s.id}>{s.value}</SuggestionsListItem>)
                )}
                
                {(suggestions.length === 0 && showSuggestions) && (
                    <div>Add new category to Your state</div>
                )}
            </SuggestionsList>
        </>
    );
};

export default Search;