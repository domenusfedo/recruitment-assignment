import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

interface IsAbsolute {
    isAbsolute: boolean
}

interface IsCTA {
    isCTA: boolean
}

interface IsActive {
    isActive: boolean
}

interface IsHorizontal {
    isHorizontal: boolean,
    isVisible: boolean
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
    margin-top: 2rem;
    padding: .5rem 2rem;
    width: 95%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    &::-webkit-scrollbar {display:none;}
`

export const SearchIcon = styled(FaSearch)`
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.5rem;
`

interface IsMain {
    isMain: boolean
}

export const SearchInput = styled.input<IsMain>`
    position: absolute;
    left: 15%;
    top: 50%;
    outline: 0;
    transform: translate(15%, -50%);

    color: ${({ theme, isMain }) => (isMain ? `${theme.colors.white}` : `${theme.colors.whiteVar1}`)};

    font-family: inherit;
    font-size: 1rem;
    z-index: 100;
    background-color: transparent;
`

export const SearchField = styled.div<IsActive>`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 2rem;
    border: 1px solid ${({ theme }) => theme.colors.blackVar2};
    border-radius: 40px;
    flex-wrap: wrap;
`

// border-bottom-left-radius: ${({ isActive }) => (!isActive ? '40px' : '0px')};
//     border-bottom-right-radius: ${({ isActive }) => (!isActive ? '40px' : '0px')};

const List = styled.ul`
    text-decoration: none;
    list-style-type: none;
    margin: 0;
    padding: 1rem 2rem;
    padding-top: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.black};
`
export const SuggestionsList = styled(List)`
    padding: 1rem 1rem;
    width: 100%;
`

export const Button = styled.button<IsCTA>`
    font-size: 1.3rem;
    padding: .8rem 2rem;
    border-radius: 25px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme, isCTA }) => (isCTA ? theme.colors.pink : theme.colors.blackVar2)};
`

export const Row = styled.div<IsHorizontal>`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${({ isHorizontal }) => (isHorizontal ? 'row' : 'column')};
    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`

export const Input = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    outline: hidden;
    position: relative;
`