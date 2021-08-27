import { useState, useEffect, useCallback } from 'react'
import { useSearchContext } from '../store/SearchContext';
import { limitNumber } from '../constants'

export const usePokemonList = () => {
    const [ pokemonList, setPokemonList ] = useState([])
    const [ pokemonListSearch, setPokemonListSearch ] = useState([])
    const [ pokemonDetail, setPokemonDetail ] = useState()
    const [ advancedSearchList, setAdvacedSearchList] = useState()
    const { search, advancedSearch, setSearch } = useSearchContext()

    const fetchAllPokemon = (url, offset) => {
        const pokeAPI = `https://pokeapi.co/api/v2/pokemon/${url || ''}?limit=${limitNumber}&offset=${offset || ''}`
        fetch(pokeAPI)
        .then(res => res.json())
        .then(res => {
            console.log(res.results)
            setPokemonList(res.results)
            return res.results
        })
        .catch(err => err)
      }

    const fetchPokemonDetails = (list) => {
        let promises = []
        const awaitJson = (responses) => Promise.all(responses.map(response => {
            if(response.ok) return response.json();
            throw new Error(response.statusText);
        }))
        list && list.forEach((pokemon) => promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)))
    
        Promise.all(promises)
        .then(awaitJson)
        .then(res => {
            setPokemonDetail(res)
            return res
        })
        .catch(err => err)
    }

    const filterPokemonListByType = useCallback((type) => {
        if(pokemonDetail) {
            const filterPokemon = pokemonDetail.map(pokemon => {
                const filterTypes = pokemon.types.map(pokemonType => pokemonType.type.name === type ? pokemon.name : '' )
                return pokemon.name === filterTypes.join('') ? pokemon : ''
            })

            const sanitizeFilterPokemon = filterPokemon.filter(e => e)
            setAdvacedSearchList(sanitizeFilterPokemon)
        }
    }, [pokemonDetail, setAdvacedSearchList])


    const fetchPokemonEvolutionChain = async (id) => {
        const url = `http://pokeapi.co/api/v2/evolution-chain/${id}/`
        const fetchChain = await fetch(url)
        const data = fetchChain.json()
        return data
    }

    useEffect(() => {
       if(pokemonList && pokemonList.length > 0) {
            fetchPokemonDetails(pokemonList)
        }
        if(pokemonListSearch && pokemonListSearch.length > 0) {
            fetchPokemonDetails(pokemonListSearch)
        }
    }, [pokemonList, pokemonListSearch])
    
    useEffect(() => {
        if(search && search.length > 0 && pokemonList.length === 30) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
            .then(res => res.json())
            .then(res => setPokemonListSearch([res]))
            .catch(err => err)
        } 
         else if(search === '') {
            fetchPokemonDetails(pokemonList)
        }
    }, [search, setSearch])

    useEffect(() => {
        if(advancedSearch.length > 0) {
            filterPokemonListByType(advancedSearch)
        }
    }, [advancedSearch, filterPokemonListByType])

    return { pokemonDetail, advancedSearchList, fetchAllPokemon, fetchPokemonDetails, fetchPokemonEvolutionChain, setPokemonListSearch }
}