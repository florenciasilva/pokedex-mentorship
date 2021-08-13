import { useContext, useEffect, useState } from 'react'
import { Box, Grid, ResponsiveContext } from 'grommet'
import PokemonCard from '../PokemonCard'
import { useSearchContext } from '../../store/SearchContext';
import { usePokemonList } from '../../hooks/usePokemonList'
import { useLocation } from "react-router-dom";

const CardList = () => {
    const location = useLocation();
    const [ pokemonCards, setPokemonCards ] = useState()
    const { search, advancedSearch } = useSearchContext()
    const { pokemonDetail, advancedSearchList, fetchAllPokemon} = usePokemonList()

    const mapPokemonCards = (list) => {
       const pokemonList = list.map((pokemon, i) => (
            <PokemonCard pokemonBasicData={pokemon} key={i} index={i}/>
        ))
        setPokemonCards(pokemonList)
    }

    useEffect(() => {
        const { pathname } = location

        if (pathname.slice(-2) > 0){ 
            fetchAllPokemon('', pathname.slice(pathname.indexOf('=') + 1))
            pokemonDetail && mapPokemonCards(pokemonDetail)
        }
    }, [location.pathname])

    useEffect(() => {
        if(advancedSearchList && advancedSearchList !== '' && advancedSearch !== '') mapPokemonCards(advancedSearchList)
        else {
            pokemonDetail && mapPokemonCards(pokemonDetail)
        }
    }, [pokemonDetail, search, advancedSearchList, advancedSearch])

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