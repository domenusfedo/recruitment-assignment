import React from 'react';
import { useDispatch } from 'react-redux';

import {removeElementFromChoosed, Suggestion} from '../../../features/termsSlice';

import {
    ElementHolder
} from './ChoosedElement.elements'

interface IProps {
    element: Suggestion
}

const ChoosedElement: React.FC<IProps> = ({element}) => {

    const dispatch = useDispatch();

    const removeElement = () => {
        dispatch(removeElementFromChoosed(element))
    }
    
    return (
        <ElementHolder>
            {element.value}
        </ElementHolder>
    );
};

export default ChoosedElement;