import { useEffect, useState } from 'react'
import { Box, Button, Collapsible } from 'grommet';
import { usePokemonTypeList } from '../../hooks/usePokemonTypeList';
import { useSearchContext } from '../../store/SearchContext'

const AdvancedSearch = () => {
    const { fetchPokemonTypeList, typeList } = usePokemonTypeList()
    const [open, setOpen] = useState(false);
    const { advancedSearch, setAdvancedSearch } = useSearchContext()

    useEffect(() => {
       fetchPokemonTypeList('')
    }, [])


    const mapTypeList = typeList && typeList.map(type => {
        return (
            <Button size="medium" secondary active={advancedSearch === type.name} label={type.name} margin="small" onClick={() => setAdvancedSearch(type.name)}/>
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
                    <Button primary onClick={() => setAdvancedSearch('')} label="Clear" />

                </Box>
            </Collapsible>
      </Box>
    )
}

export default AdvancedSearch