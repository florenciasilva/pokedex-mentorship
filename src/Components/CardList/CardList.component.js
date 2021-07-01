import { useContext, useEffect } from 'react'
import { Box, Grid, ResponsiveContext, Grommet } from 'grommet'
import { grommet } from 'grommet/themes';
import PokemonCard from '../PokemonCard'
import { useFetcher } from '../../hooks/useFetcher'
import { useSearchContext } from '../../store/SearchContext';

const CardList = () => {
    const { fetchPokemon, data: pokemonData } = useFetcher()
    const { search } = useSearchContext()

    useEffect(() => {
        const request = search ? search : ''
        fetchPokemon(request)
    }, [search])


    const size = useContext(ResponsiveContext);
    const determinePokemonDataStructure = pokemonData && pokemonData.results ? pokemonData.results : [pokemonData]
    return (
    <Grommet theme={grommet} full>
        <Box pad="large">
            {pokemonData ?
                <Grid columns={size !== 'small' ? 'small' : '100%'} gap="small">
                    {determinePokemonDataStructure.map((pokemonBasicData, i) => (
                        <PokemonCard pokemonBasicData={pokemonBasicData} key={i} />
                    ))}
            </Grid>
            : null } 
        </Box>
    </Grommet>
    )
}

export default CardList