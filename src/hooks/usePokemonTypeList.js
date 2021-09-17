import { useState } from 'react'

export const usePokemonTypeList = () => {
    const [ typeList, setTypeList ] = useState('')

    const fetchPokemonTypeList = () => {
        const pokeAPI = 'https://pokeapi.co/api/v2/type/'
        fetch(pokeAPI)
        .then(res => res.json())
        .then(data => setTypeList(data.results))
        .catch(err => err)
  }
    

    return { fetchPokemonTypeList, typeList }
}