import { useContext, useEffect, useState } from 'react'
import { Box, Grid, ResponsiveContext } from 'grommet'
import PokemonCard from '../PokemonCard'
import { useSearchContext } from '../../store/SearchContext';
import { usePokemonList } from '../../hooks/usePokemonList'

const CardList = ({pathname}) => {
    const [ pokemonCards, setPokemonCards ] = useState()
    const { search, advancedSearch } = useSearchContext()
    const { pokemonDetail, advancedSearchList } = usePokemonList()

    const mapPokemonCards = (list) => {
       const pokemonList = list.map((pokemon, i) => (
            <PokemonCard pokemonBasicData={pokemon} key={i} index={i}/>
        ))

        setPokemonCards(pokemonList)
    }

    useEffect(() => {
        if(advancedSearchList && advancedSearchList !== '' && advancedSearch !== '') mapPokemonCards(advancedSearchList)
        else {
            pokemonDetail && mapPokemonCards(pokemonDetail)
        }
    }, [pokemonDetail, search, advancedSearchList, advancedSearch, pathname])

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