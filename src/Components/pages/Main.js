import CardList from '../CardList'
import Pagination from '../Pagination'
import { useEffect } from 'react'


const Main = () => {

    useEffect(() => {
        console.log('use effect', window.location.href)
    }, [window.location])
    
    return (
        <>
            <CardList pathname={window.location.href}/>
            <Pagination />
        </>
    )
}

export default Main