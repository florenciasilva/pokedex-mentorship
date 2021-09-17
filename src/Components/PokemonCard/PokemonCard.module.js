import styled from 'styled-components'
import { CardHeader } from 'grommet'

export const StyledCardHeader = styled(CardHeader)`
    background-image: url(${props => props.sprite});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;   
`