import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa'

export const AppHolder = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
`

export const Holder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

export const SearchIcon = styled(FaSearch)`
    color: ${({ theme }) => theme.colors.white};
    font-size: 2rem;
    cursor: pointer;
`