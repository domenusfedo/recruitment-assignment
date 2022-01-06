import styled from "styled-components";

export const ElementHolder = styled.div`
    width: fit-content;

    border: 1px solid ${({ theme }) => theme.colors.blackVar2};
    border-radius: 25px;

    padding: .5rem 1rem;

    color: ${({ theme }) => theme.colors.white};
`