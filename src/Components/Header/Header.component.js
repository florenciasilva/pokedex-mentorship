import Search from '../Search/'
import AdvancedSearch from '../AdvancedSearch'
import { Heading, Box } from 'grommet'

const Header = () => (
    <Box fill justify="center" align="center">
        <Heading>Pokedex App</Heading>
        <Search />
        <AdvancedSearch />
    </Box>
)

export default Header