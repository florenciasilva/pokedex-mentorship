import { useContext, useEffect } from 'react'
import { Box, Grid, ResponsiveContext } from 'grommet'
import PokemonCard from '../PokemonCard'
import { useDataContext } from '../../store/DataContext'
import { useSearchContext } from '../../store/SearchContext';

const CardList = () => {
    const { fetchAllPokemon, data: pokemonData } = useDataContext()
    const { search } = useSearchContext()

    useEffect(() => {
        const request = search ? search : ''
        fetchAllPokemon(request)
    }, [search])

    const size = useContext(ResponsiveContext);
    return (
        <Box fill>
            {pokemonData ?
                <Grid data-testid="pokemon-card" columns={size !== 'small' ? 'small' : '100%'} gap="medium">
                    {pokemonData.results.map((pokemonBasicData, i) => (
                        <PokemonCard pokemonBasicData={pokemonBasicData} key={i} index={i} />
                    ))}
            </Grid>
            : null } 
        </Box>
    )
}

export default CardList