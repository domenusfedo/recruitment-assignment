import styled from "styled-components";
import { IoIosClose } from 'react-icons/io';


export const ElementHolder = styled.div`
    width: fit-content;

    border: 1px solid ${({ theme }) => theme.colors.blackVar2};
    border-radius: 25px;

    padding: .5rem 1rem;

    margin-bottom: .5rem;
    margin-top: .5rem;
    margin-right: .5rem;

    color: ${({ theme }) => theme.colors.white};

    display: flex;
    justify-content: center;
    align-items: center;
`

export const RemoveButton = styled(IoIosClose)`
    color: ${({ theme }) => theme.colors.white};

    font-size: 2rem;

    &:hover {
        cursor: pointer;
    }

    transition: all .5s;
`

export const Category = styled.div`
    background-color: ${({ theme }) => theme.colors.blackVar2};
    font-size: .7rem;

    padding: .2rem .8rem;

    border-radius: 5px;

    color: ${({ theme }) => theme.colors.white};
`
export const Text = styled.span`
    margin: 0 .5rem;
`