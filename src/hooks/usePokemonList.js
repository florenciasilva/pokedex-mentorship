import { useState, useEffect } from 'react'
import { useSearchContext } from '../store/SearchContext';
import { limitNumber } from '../constants'

export const usePokemonList = () => {
    const [ pokemonList, setPokemonList ] = useState()
    const [ pokemonDetail, setPokemonDetail ] = useState()
    const [ advancedSearchList, setAdvacedSearchList] = useState()
    const { search, advancedSearch } = useSearchContext()


    const fetchPokemonDetails = () => {
        let promises = []
        const awaitJson = (responses) => Promise.all(responses.map(response => {
            if(response.ok) return response.json();
            throw new Error(response.statusText);
        }))

        pokemonList && pokemonList.forEach((pokemon) => promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)))
    
        Promise.all(promises)
        .then(awaitJson)
        .then(res => {
            setPokemonDetail(res)})
        .catch(err => err)
    }

    const fetchPokemonByType = (type) => {
        if(pokemonDetail) {
            const filterPokemon = pokemonDetail.map(pokemon => {
                const filterTypes = pokemon.types.map(pokemonType => pokemonType.type.name === type ? pokemon.name : '' )
                return pokemon.name === filterTypes.join('') ? pokemon : ''
            })

            const sanitizeFilterPokemon = filterPokemon.filter(e => e)
            setAdvacedSearchList(sanitizeFilterPokemon)
        }
    }

    const fetchAllPokemon = (url, offset) => {
        const pokeAPI = `https://pokeapi.co/api/v2/pokemon/${url || ''}?limit=${limitNumber}&offset=${offset || ''}`
        fetch(pokeAPI)
        .then(res => res.json())
        .then(res => setPokemonList(res.results))
        .catch(err => err)
      }

    useEffect(() => {
        fetchAllPokemon()
    }, [])    

    useEffect(() => {
        fetchPokemonDetails()
    }, [pokemonList])

    useEffect(() => {
        if(search.length > 0) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
            .then(res => res.json())
            .then(res => setPokemonList([res]))
            .catch(err => err)
        }
    }, [search])

    useEffect(() => {
        if(advancedSearch.length > 0) {
            fetchPokemonByType(advancedSearch)
        }
    }, [advancedSearch])



    return { pokemonDetail, fetchPokemonByType, advancedSearchList, fetchAllPokemon }
}