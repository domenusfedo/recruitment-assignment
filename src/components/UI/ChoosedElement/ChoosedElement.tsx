import React from 'react';

import {
    Suggestion
} from '../../../features/termsSlice';

import {
    ElementHolder,
    RemoveButton,
    Category,
    Text
} from './ChoosedElement.elements'

interface IProps {
    element: Suggestion,
    removeElementHandler: (element: Suggestion) => void
}

const ChoosedElement: React.FC<IProps> = ({element, removeElementHandler}) => {
    
    return (
        <ElementHolder>
            <Category>{element.category}</Category>
            <Text>{element.value}</Text>
            <RemoveButton onClick={() => removeElementHandler(element)}/>
        </ElementHolder>
    );
};

export default ChoosedElement;