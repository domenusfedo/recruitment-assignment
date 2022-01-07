import styled from "styled-components"

interface IsActive {
    isActive: boolean
}

export const SuggestionsListItem = styled.li<IsActive>`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;

    border: ${({ theme, isActive }) => (isActive ? `1px solid ${theme.colors.blackVar2}` : '1px solid transparent')};
    border-radius: 10px;

    padding: .5rem;

    width: 100%;
    margin-bottom: .5rem;

    cursor: pointer;
`

export const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    background-color: transparent;

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
    overflow: hidden;

    border-radius: 25px;
`