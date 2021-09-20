import { useState, useEffect } from 'react'
import { useSearchContext } from '../store/SearchContext'
import { limitNumber } from '../constants'
import { filterPokemonListByType } from '../utils/filterPokemonListByType'

export const usePokemonList = () => {
    const [ pokemonList, setPokemonList ] = useState([])
    const [ pokemonListSearch, setPokemonListSearch ] = useState([])
    const [ pokemonDetail, setPokemonDetail ] = useState()
    const [ advancedSearchList, setAdvacedSearchList] = useState()
    const [ loading, setIsLoading ] = useState(true)
    const { search, advancedSearch, setSearch } = useSearchContext()
    const fetchAllPokemon = (url, offset) => {
        const pokeAPI = `https://pokeapi.co/api/v2/pokemon/${url || ''}?limit=${limitNumber}&offset=${offset || ''}`
        fetch(pokeAPI)
        .then(res => res.json())
        .then(res => {
            setPokemonList(res.results)
        })
        .catch(err => err)
      }

    const fetchPokemonDetails = (list) => {
        let promises = []
        const awaitJson = (responses) => Promise.all(responses.map(response => {
            if(response.ok) return response.json()
            throw new Error(response.statusText)
        }))
        list && list.forEach((pokemon) => promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)))

        Promise.all(promises)
        .then(awaitJson)
        .then(res => {
            setIsLoading(true)
            return res
        })
        .then(res => {
            setPokemonDetail(res)
            setIsLoading(false)
            return res
        })
        .catch(err => err)
    }

    const fetchPokemonEvolutionChain = async (id) => {
        const url = `http://pokeapi.co/api/v2/pokemon-species/${id}/`
        const fetchChain = await fetch(url)
        const data = fetchChain.json()
        return data
    }

    useEffect(() => {
       if(pokemonList && pokemonList.length > 0 ) {
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
        } else {
            fetchPokemonDetails(pokemonList)
        } 
    }, [search, setSearch])

    useEffect(() => {
        if(advancedSearch.length > 0) {
            filterPokemonListByType(advancedSearch, setAdvacedSearchList, pokemonDetail)
        }
    }, [advancedSearch, filterPokemonListByType])

    return { pokemonDetail, advancedSearchList, fetchAllPokemon, fetchPokemonDetails, fetchPokemonEvolutionChain, setPokemonListSearch, pokemonListSearch, loading }
}