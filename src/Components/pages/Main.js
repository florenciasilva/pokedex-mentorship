import React from 'react';
import Pagination from '../Pagination'
import CardList from '../CardList'

const Main = () => {
    return (
        <>
        <CardList pathname={window.location.href}/>
        <Pagination />
        </>
    )
}

export default Main

