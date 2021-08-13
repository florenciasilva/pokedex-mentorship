import { useState, useEffect } from 'react'
import { usePokemonList } from '../hooks/usePokemonList'
import { limitNumber } from '../constants'

export const usePagination = () => {
    const [ offset, setOffset ] = useState(0)
    const { fetchAllPokemon } = usePokemonList()


    const handleNextPage = () => {
        const newOffset = offset + limitNumber;
        setOffset(newOffset)
      }

      const handlePreviousPage = () => {
        const newOffset = offset - limitNumber
        newOffset > 0 ? setOffset(newOffset) : setOffset(0)
      }

      useEffect(() => {
        window.history.pushState({ ...window.history.state }, '', `offset=${offset}`)
        fetchAllPokemon('' , offset)
      }, [offset])

    return { handleNextPage, handlePreviousPage, setOffset}
}