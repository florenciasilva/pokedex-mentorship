import { Card, Heading } from 'grommet'
import PokemonDetailsDropdown from '../PokemonDetailsDropdown'
import { useFetcher } from '../../hooks/useFetcher'
import { useState } from 'react'

const PokemonCard = ({pokemonBasicData}) => {
    const { name } = pokemonBasicData
    const { fetchPokemon, data } = useFetcher()
    const [ showDropdown, setShowDropdown ] = useState(false)

    const handleDropdown = () => {
        if(name && !showDropdown) {
            fetchPokemon(name)
            setShowDropdown(true)
        } else if (data && showDropdown) {
            setShowDropdown(false)
        } else {
            setShowDropdown(false)
        }
    }

    return (
        <Card pad="large">
            <Heading level={2} size="small" margin="none">{name}</Heading>
            <button onClick={handleDropdown}>Dropdown</button>
            { showDropdown && data ? <PokemonDetailsDropdown pokemonDetail={data} /> : null }
        </Card>
    )
}

export default PokemonCard