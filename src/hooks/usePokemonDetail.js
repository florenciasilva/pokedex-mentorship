import { useState } from 'react'
import { useFetcher } from './useFetcher'

export const usePokemonDetail = () => {
    const [ pokemonData, setPokemonData ] = useState('')
    const { fetchPokemon } = useFetcher()

    const getPokemonDetail = (pokemonName) => {
        const data = fetchPokemon(pokemonName)       
        setPokemonData(data)
    }
    

    return { pokemonData, getPokemonDetail }
}