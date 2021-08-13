import CardList from '../CardList'
import Pagination from '../Pagination'

const Main = () => {
    return (
        <>
            <CardList pathname={window.location.href}/>
            <Pagination />
        </>
    )
}

export default Main