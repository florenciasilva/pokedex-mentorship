import { useEffect, useState } from 'react'
import { Box, Grid } from 'grommet'
import PokemonCard from '../PokemonCard'
import { useSearchContext } from '../../store/SearchContext';
import { usePokemonList } from '../../hooks/usePokemonList'
import { useLocation } from "react-router-dom";

const CardList = ({detail}) => {
    const location = useLocation();
    const [ pokemonCards, setPokemonCards ] = useState()
    const { search, advancedSearch } = useSearchContext()
    const { advancedSearchList, pokemonDetail, fetchAllPokemon} = usePokemonList()

    const mapPokemonCards = (list) => {
       const pokemonList = list.map((pokemon, i) => (
            <PokemonCard pokemonBasicData={pokemon} key={i} index={i}/>
        ))
        setPokemonCards(pokemonList)
    }

    useEffect(() => {
        fetchAllPokemon()
    }, [])

    useEffect(() => {
        const { pathname } = location
        if (pathname.slice(-2) > 0){ 
            fetchAllPokemon('', pathname.slice(pathname.indexOf('=') + 1))
            pokemonDetail && mapPokemonCards(pokemonDetail)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        if(advancedSearchList && advancedSearchList !== '' && advancedSearch !== '') mapPokemonCards(advancedSearchList)
        else {
            pokemonDetail && mapPokemonCards(pokemonDetail)
        }
    }, [pokemonDetail, search, advancedSearchList, advancedSearch])

    return !pokemonDetail ? <p>loading</p> : (
        <Box fill margin={{ top: "medium"}}>
            <Grid data-testid="pokemon-card" columns='medium' gap="xsmall">
                {pokemonCards}
            </Grid>
        </Box>
    )
}

export default CardList