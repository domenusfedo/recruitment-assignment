import React from 'react';

import {
    Suggestion
} from '../../../features/termsSlice';

import {
    ElementHolder,
    RemoveButton,
    Category,
    Text,
    Row
} from './ChoosedElement.elements'

interface IProps {
    element: Suggestion,
    removeElementHandler: (element: Suggestion) => void
}

const ChoosedElement: React.FC<IProps> = ({element, removeElementHandler}) => {
    
    return (
        <ElementHolder>
            {/* <Row> */}
                <Text>{element.value}</Text>
                <Category>{element.category.toUpperCase()}</Category>
            {/* </Row>
            <Row> */}
                <RemoveButton onClick={() => removeElementHandler(element)}/>
            {/* </Row> */}
        </ElementHolder>
    );
};

export default ChoosedElement;