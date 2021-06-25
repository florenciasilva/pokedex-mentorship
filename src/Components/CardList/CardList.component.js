import { useContext, useEffect } from 'react'
import { Box, Grid, ResponsiveContext, Grommet } from 'grommet'
import { grommet } from 'grommet/themes';
import PokemonCard from '../PokemonCard'
import { useFetcher } from '../../hooks/useFetcher'
import { usePokemonSimpleSearch } from '../../hooks/usePokemonSimpleSearch';

const CardList = () => {
    const { fetchPokemon, data: pokemonData } = useFetcher()
    const { searchedPokemon } = usePokemonSimpleSearch()

    useEffect(() => {
        console.log('useeffect')
        console.log(searchedPokemon, '<- LSKFLS')
        const request = searchedPokemon ? searchedPokemon : ''
        fetchPokemon(request)
    }, [])
  
    const size = useContext(ResponsiveContext);
    return (
    <Grommet theme={grommet} full>
        <Box pad="large">
            {pokemonData ?
                <Grid columns={size !== 'small' ? 'small' : '100%'} gap="small">
                    {pokemonData.results.map((pokemonBasicData, i) => (
                        <PokemonCard pokemonBasicData={pokemonBasicData} key={i} />
                    ))}
            </Grid>
            : null } 
        </Box>
    </Grommet>
    )
}

export default CardList