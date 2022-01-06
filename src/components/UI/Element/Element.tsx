import React from 'react';
import { useDispatch } from 'react-redux';

import {addElementToChoosed, Suggestion} from '../../../features/termsSlice';

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
    const dispatch = useDispatch();

    const addElement = () => {
        dispatch(addElementToChoosed(element))
    }

    return (
        <SuggestionsListItem key={element.id} onClick={addElement}>
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