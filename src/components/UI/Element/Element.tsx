import React from 'react';

import {Suggestion} from '../../../features/termsSlice';

import {
    Category,
    Image,
    Row,
    SuggestionsListItem,
    Title
} from './Element.elements'

interface IProps {
    element: Suggestion,
    addElementHandler: (element: Suggestion) => void
}

const Element: React.FC<IProps> = ({element, addElementHandler}) => {

    const addHandler = () => {
        console.log(element)
        addElementHandler(element)
    }

    return (
        <SuggestionsListItem key={element.id} onClick={addHandler}>
            <Row>
                <Image/>
            </Row>
            <Row>
                <Title>{element.value}</Title>
                <Category>{element.category}</Category>
            </Row>
        </SuggestionsListItem>
    );
};

export default Element;