import { useEffect, useState } from 'react'
import { useDataContext } from '../../store/DataContext'
import { Box, Button, Collapsible } from 'grommet';
import { usePokemonList } from '../../hooks/usePokemonList';

const AdvancedSearch = () => {
    const { fetchPokemonTypeList, typeList } = useDataContext()
    const { fetchPokemonByType } = usePokemonList()
    const [open, setOpen] = useState(false);

    useEffect(() => {
       fetchPokemonTypeList('')
    }, [])


    const handleTypeFilter = (type) => {
        fetchPokemonByType(type)
    }


    const mapTypeList = typeList && typeList.map(type => {
        return (
            <Button size="medium" secondary label={type.name} margin="small" onClick={() => handleTypeFilter(type.name)}/>
        )
    })

    return (
        <Box align="center" gap="small" fill justify="center">
            <Button primary onClick={() => setOpen(!open)} label="Advanced Search" />
            <Collapsible open={open}>
                <Box
                    background="light-2"
                    round="medium"
                    pad="medium"
                    align="center"
                    justify="start"
                    direction="row"
                    wrap
                    gap="small"
                    fill
                >
                    {mapTypeList}
                </Box>
            </Collapsible>
      </Box>
    )
}

export default AdvancedSearch