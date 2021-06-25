import { Card, Heading } from 'grommet'
import PokemonDetailsDropdown from '../PokemonDetailsDropdown'
import { useFetcher } from '../../hooks/useFetcher'

const PokemonCard = ({pokemonBasicData}) => {
    const { name } = pokemonBasicData
    const { fetchPokemon, data } = useFetcher()
 
    return (
        <Card pad="large">
            <Heading level={2} size="small" margin="none">{name}</Heading>
            <button onClick={() => fetchPokemon(name)}>Dropdown</button>
            { data ? <PokemonDetailsDropdown pokemonDetail={data} /> : null }
        </Card>
    )
}

export default PokemonCard