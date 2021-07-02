import { useState, useEffect } from 'react'
import { useDataContext } from '../store/DataContext'
import { limitNumber } from '../constants'

export const usePagination = () => {
    const [ offset, setOffset ] = useState(0)
    const { fetchAllPokemon } = useDataContext()

    const handleNextPage = () => {
        const newOffset = offset + limitNumber;
        setOffset(newOffset)
      }

      const handlePreviousPage = () => {
        const newOffset = offset - limitNumber
        newOffset > 0 ? setOffset(newOffset) : setOffset(0)
      }

      useEffect(() => {
        fetchAllPokemon('' , offset)
      }, [offset])

    return { handleNextPage, handlePreviousPage}
}