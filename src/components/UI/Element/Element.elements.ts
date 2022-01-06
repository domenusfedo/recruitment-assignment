import styled from "styled-components"

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