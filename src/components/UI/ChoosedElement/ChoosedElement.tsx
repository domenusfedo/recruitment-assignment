import React from 'react';

import {
    Suggestion
} from '../../../features/termsSlice';

import {
    ElementHolder,
    RemoveButton,
    Category,
    Text,
} from './ChoosedElement.elements';

import { removeElementFromChoosed } from '../../../features/termsSlice'
import { useDispatch } from 'react-redux';

interface IProps {
    element: Suggestion
}

// useMemo this function
const removeElementHandler = () => {

}


const ChoosedElement: React.FC<IProps> = ({element}) => {
    
    return (
        <ElementHolder id={element.id.toString()} role='combobox'>
            <Text role='definition'>{element.value}</Text>
            <Category role='content-info'>{element.category.toUpperCase()}</Category>
            <RemoveButton role='button'/>
        </ElementHolder>
    );
};

export default ChoosedElement;