import { useState } from 'react'
import { useDataContext } from '../store/DataContext'

export const usePokemonDetail = () => {
    const [ pokemonData, setPokemonData ] = useState('')
    const { fetchAllPokemon } = useDataContext()

    const getPokemonDetail = (pokemonName) => {
        const data = fetchAllPokemon(pokemonName)       
        setPokemonData(data)
    }
    

    return { pokemonData, getPokemonDetail }
}