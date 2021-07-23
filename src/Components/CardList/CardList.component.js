import { useContext, useEffect, useState } from 'react'
import { Box, Grid, ResponsiveContext } from 'grommet'
import PokemonCard from '../PokemonCard'
import { useSearchContext } from '../../store/SearchContext';
import { usePokemonList } from '../../hooks/usePokemonList'

const CardList = () => {
    const [ pokemonCards, setPokemonCards ] = useState()
    const { search } = useSearchContext()
    const { pokemonDetail } = usePokemonList()

    useEffect(() => {
        const mapPokemonList = pokemonDetail && pokemonDetail.map((pokemon, i) => (
            <PokemonCard pokemonBasicData={pokemon} key={i} index={i}/>
        ))

        setPokemonCards(mapPokemonList)
    }, [search, pokemonDetail])
    

    const size = useContext(ResponsiveContext);
    return (
        <Box fill margin={{ top: "medium"}}>
            <Grid data-testid="pokemon-card" columns={size !== 'small' ? 'small' : '100%'} gap="medium">
                {pokemonCards}
            </Grid>
        </Box>
    )
}

export default CardList