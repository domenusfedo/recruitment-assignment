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
    isActive: boolean
}

const Element: React.FC<IProps> = ({element, isActive}) => {
    return (
        <SuggestionsListItem key={element.id} isActive={isActive}>
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