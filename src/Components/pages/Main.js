import React, { Suspense } from 'react';
import Pagination from '../Pagination'
import { Spinner } from 'grommet'
const CardList = React.lazy(() => import('../CardList'));

const Main = () => {
    return (
        <>
         <Suspense fallback={<Spinner size="medium"/>}>
            <CardList pathname={window.location.href}/>
        </Suspense>
        <Pagination />
        </>
    )
}

export default Main

