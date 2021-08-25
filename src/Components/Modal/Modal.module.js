import styled from 'styled-components'
import { DialogContent } from "@reach/dialog";

export const StyledDialog = styled(DialogContent)`
    background-color: ${props => props.typeColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
`