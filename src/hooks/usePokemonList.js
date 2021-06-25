/*import { usePokemonSimpleSearch } from './usePokemonSimpleSearch'
import { useFetcher } from './useFetcher'
import { useState } from 'react'

export const usePokemonList = () => {
  const { searchedPokemon } = usePokemonSimpleSearch()
  const [ pokemonList, setPokemonList ] = useState()

  const getPokemonList = () => {
    const data = useFetcher(searchedPokemon)
    setPokemonList(data)
  }
  return {
    pokemonList,
    getPokemonList
  }
}
*/