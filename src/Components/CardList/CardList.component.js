import { useEffect, useState, useRef } from 'react'
import { Box, Grid, Spinner } from 'grommet'
import PokemonCard from '../PokemonCard'
import { useSearchContext } from '../../store/SearchContext';
import { usePokemonList } from '../../hooks/usePokemonList'
import { useLocation } from "react-router-dom";

const CardList = () => {
    const location = useLocation();
    const [ pokemonCards, setPokemonCards ] = useState()
    const [ loading, setIsLoading ] = useState(true)
    const { search, advancedSearch } = useSearchContext()
    const { advancedSearchList, pokemonDetail, fetchAllPokemon, pokemonListSearch, loading} = usePokemonList()
    const { pathname } = location
    const ref = useRef()
    const mapPokemonCards = (list) => {
       const pokemonList = list.map((pokemon, i) => (
            <PokemonCard pokemonBasicData={pokemon} key={i} index={i}/>
        ))
        setPokemonCards(pokemonList)
    }

    useEffect(() => {
        if(!ref.current && pokemonDetail) {
            setIsLoading(false)
        }
    }, [pokemonDetail, location.pathname])

    useEffect(() => {
        if (pathname.slice(-2) > 0){ 
            fetchAllPokemon('', pathname.slice(pathname.indexOf('=') + 1))
            pokemonDetail && mapPokemonCards(pokemonDetail)
        } else {
            fetchAllPokemon()
        } 
        setIsLoading(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        if(advancedSearchList && advancedSearchList !== '' && advancedSearch !== '') mapPokemonCards(advancedSearchList)
        else if(pokemonListSearch && pokemonListSearch !== '' && search !== '') mapPokemonCards(pokemonListSearch)
        else {
            pokemonDetail && mapPokemonCards(pokemonDetail)
        }
    }, [pokemonDetail, search, advancedSearchList, advancedSearch, pokemonListSearch])

    return !pokemonDetail || loading ? <Spinner size="medium" message={{
        start: "Pokemon list is loading",
        end: "Pokemon list has finished loading"
      }}/> : (
        <Box fill margin={{ top: "medium"}}>
            <Grid data-testid="pokemon-card" columns='medium' gap="xsmall" ref={ref}>
                {pokemonCards}
            </Grid>
        </Box>
    )
}

export default CardList