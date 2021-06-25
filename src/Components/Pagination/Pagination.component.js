import { usePagination } from '../../hooks/usePagination'
import { Box, Button } from 'grommet'
const Pagination = () => {
    const { handleNextPage, handlePreviousPage } = usePagination()

    return (
        <Box pad="medium" justify="center" align="center" direction="row" gap="large">
            <Button onClick={handlePreviousPage} primary label="Previous" />
            <Button onClick={handleNextPage} primary label="Next" />
        </Box>
    )
}

export default Pagination