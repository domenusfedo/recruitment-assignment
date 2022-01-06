import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

interface IsAbsolute {
    isAbsolute: boolean
}

interface IsCTA {
    isCTA: boolean
}

export const SearchHolder = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.main};
    position: absolute;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`

export const Header = styled.div<IsAbsolute>`
    width: 100%;
    padding: 2rem;

    color: ${({ theme }) => theme.colors.white};

    position: ${({ isAbsolute }) => (isAbsolute ? 'absolute' : '')};
    bottom: 0;
    left: 0;


    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 0.5px solid ${({ theme }) => theme.colors.blackVar2};
    border-top: 0.5px solid ${({ theme }) => theme.colors.blackVar2};
`;

export const Text = styled.span`
    font-weight: bold;
    font-size: 2rem;
`;

export const ButtonHolder = styled.div`
    width: 40px;
    height: 40px;

    border: 1px solid ${({ theme }) => theme.colors.white};
    border-radius: 50%;

    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
`;
export const ToggleButton = styled(IoIosClose)`
    color: ${({ theme }) => theme.colors.white};

    width: 100%;
    height: 100%;

    font-size: 2rem;

    &:hover {
        background-color: ${({ theme }) => theme.colors.blackVar};
        cursor: pointer;
    }

    transition: all .5s;
`

export const SearchPlace = styled.div`
    margin: 1rem 0;
    padding: .5rem 2rem;
    width: 90%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    border: 1px solid ${({ theme }) => theme.colors.blackVar2};
    border-radius: 40px;
`

export const SearchIcon = styled(FaSearch)`
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.5rem;
`

export const SearchField = styled.input`
    outline: 0;
    padding: 1rem 1rem;
    width: 100%;
    height: 100%;

    color: ${({ theme }) => theme.colors.white};

    font-family: inherit;
    font-size: 1rem;
`

export const SuggestionsList = styled.ul`
    text-decoration: none;
    list-style-type: none;
    margin: 0;
    padding: 1rem 2rem;
    width: 100%;
`

export const SuggestionsListItem = styled.li`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;

    width: 100%;
    margin-bottom: .5rem;
`

export const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    &:nth-child(2) {
        margin-left: .5rem;
    }
`
export const Title = styled.span`
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: .5rem;
`

export const Category = styled.span`
    background-color: ${({ theme }) => theme.colors.blackVar2};
    font-size: .7rem;

    padding: .2rem .8rem;

    border-radius: 5px;

    color: ${({ theme }) => theme.colors.white};
`

export const Image = styled.div`
    width: 50px;
    height: 50px;

    background-color: ${({ theme }) => theme.colors.blackVar2};

    border-radius: 25px;
`
export const Button = styled.button<IsCTA>`
    font-size: 1.3rem;

    padding: .8rem 2rem;

    border-radius: 25px;

    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme, isCTA }) => (isCTA ? theme.colors.pink : theme.colors.blackVar2)};
`