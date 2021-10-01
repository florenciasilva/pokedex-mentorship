import { useState, useEffect } from 'react'
import { limitNumber } from '../constants'
import { useHistory } from 'react-router-dom'
import { restoreScroll } from '../utils/restoreScroll'

export const usePagination = () => {
    const history = useHistory()
    const [ offset, setOffset ] = useState(0)

    const handleNextPage = () => {
        const newOffset = offset + limitNumber;
        restoreScroll()
        setOffset(newOffset)
      }

      const handlePreviousPage = () => {
        const newOffset = offset - limitNumber
        restoreScroll()
        newOffset > 0 ? setOffset(newOffset) : setOffset(0)
      }

      useEffect(() => {
       history.push(`offset=${offset}`, '')
      }, [offset, history])

    return { handleNextPage, handlePreviousPage, setOffset}
}