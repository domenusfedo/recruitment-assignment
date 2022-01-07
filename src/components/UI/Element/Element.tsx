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
    element: Suggestion
}

const Element: React.FC<IProps> = ({element}) => {
    
    return (
        <SuggestionsListItem key={element.id}>
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