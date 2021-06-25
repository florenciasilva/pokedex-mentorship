import { useState } from 'react'

export const usePokemonSimpleSearch = () => {
  const [searchedPokemon, setSearchedPokemon] = useState('');
  const onSearchSubmit = (search) => search && setSearchedPokemon(search)

  console.log(searchedPokemon, '<- en hook')
  return { searchedPokemon, onSearchSubmit }
}