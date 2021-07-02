import Search from '../Search/'
import { Heading, Box } from 'grommet'

const Header = () => (
    <Box fill justify="center" align="center">
        <Heading>Pokedex App</Heading>
        <Search />
    </Box>
)

export default Header