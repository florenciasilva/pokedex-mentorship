import { useEffect, useState } from 'react'
import { Box, Grid, Spinner } from 'grommet'
import PokemonCard from '../PokemonCard'
import { useSearchContext } from '../../store/SearchContext';
import { usePokemonList } from '../../hooks/usePokemonList'
import { useLocation } from "react-router-dom";

const CardList = () => {
    const location = useLocation();
    const [ pokemonCards, setPokemonCards ] = useState()
    const { search, advancedSearch } = useSearchContext()
    const { advancedSearchList, pokemonDetail, fetchAllPokemon, pokemonListSearch, loading} = usePokemonList()
    const { pathname } = location
    const mapPokemonCards = (list) => {
       const pokemonList = list.map((pokemon, i) => (
            <PokemonCard pokemonBasicData={pokemon} key={i} index={i}/>
        ))
        setPokemonCards(pokemonList)
    }

    useEffect(() => {
        fetchAllPokemon()
    }, [location.pathname])

    useEffect(() => {
        if (pathname.slice(-2) > 0){ 
            fetchAllPokemon('', pathname.slice(pathname.indexOf('=') + 1))
            pokemonDetail && mapPokemonCards(pokemonDetail)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        if(advancedSearchList && advancedSearchList !== '' && advancedSearch !== '') mapPokemonCards(advancedSearchList)
        else if(pokemonListSearch && pokemonListSearch !== '' && search !== '') mapPokemonCards(pokemonListSearch)
        else {
            pokemonDetail && mapPokemonCards(pokemonDetail)
        }
    }, [pokemonDetail, search, advancedSearchList, advancedSearch, pokemonListSearch])

    return !pokemonDetail || loading ? <Spinner /> : (
        <Box fill margin={{ top: "medium"}}>
            <Grid data-testid="pokemon-card" columns='medium' gap="xsmall">
                {pokemonCards}
            </Grid>
        </Box>
    )
}

export default CardList