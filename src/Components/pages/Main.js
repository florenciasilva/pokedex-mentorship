import CardList from '../CardList'
import Pagination from '../Pagination'
import { usePokemonList } from '../../hooks/usePokemonList'
import { useEffect } from 'react'

const Main = () => {
    return (
        <>
            <CardList pathname={window.location.href}/>
            <Pagination />
        </>
    )
}

export default Main