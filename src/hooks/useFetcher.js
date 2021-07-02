import { useState } from 'react'

export const useFetcher = () => {
  const [ data, setData ] = useState()
  const [ err, setErr ] = useState()


  const fetchPokemon = (url) => {
    const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/' + url
    fetch(pokeAPI)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => setErr(err))
  }

    return { fetchPokemon, data, err }
}