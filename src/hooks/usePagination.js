import { useState, useEffect } from 'react'
import { useSearchContext } from '../store/SearchContext'
import { limitNumber } from '../constants'
import { useHistory } from 'react-router-dom'

export const usePagination = () => {
    const history = useHistory()
    const { search } = useSearchContext
    const [ offset, setOffset ] = useState(0)

    const handleNextPage = () => {
        const newOffset = offset + limitNumber;
        setOffset(newOffset)
      }

      const handlePreviousPage = () => {
        const newOffset = offset - limitNumber
        newOffset > 0 ? setOffset(newOffset) : setOffset(0)
      }

      useEffect(() => {
       history.push(`offset=${offset}`, '')
      }, [offset, history])

    return { handleNextPage, handlePreviousPage, setOffset}
}