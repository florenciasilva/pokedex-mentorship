import { useState, useEffect } from 'react'
import { useSearchContext } from '../store/SearchContext';

export const usePokemonList = () => {
    const [ pokemonList, setPokemonList ] = useState()
    const [ pokemonDetail, setPokemonDetail ] = useState()
    const [ isAdvancedSearch, setIsAdvancedSearch ] = useState(false)
    const [ searchedType, setType ] = useState()
    const { search } = useSearchContext()

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/`)
        .then(res => res.json())
        .then(res => setPokemonList(res.results))
        .catch(err => err)
    }, [search])    

    useEffect(() => {
       let promises = []
       const awaitJson = (responses) => Promise.all(responses.map(response => {
        if(response.ok) return response.json();
        throw new Error(response.statusText);
      }))

      !isAdvancedSearch && pokemonList && pokemonList.forEach((pokemon) => promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)))
    
        Promise.all(promises)
        .then(awaitJson)
        .then(res => setPokemonDetail(res))
        .catch(err => err)
    
    }, [pokemonList, isAdvancedSearch])

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
        .then(res => res.json())
        .then(res => setPokemonList([res]))
        .catch(err => err)
    }, [search])


    const fetchPokemonByType = (searchedType) => {
        setIsAdvancedSearch(true)
        setType(searchedType)
      }

    useEffect(() => {
        console.log(pokemonDetail, searchedType, '<- ñslf')
    }, [ searchedType, pokemonDetail ])


    return { pokemonDetail, fetchPokemonByType }
}