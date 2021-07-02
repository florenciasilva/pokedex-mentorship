import { Card, Heading, Button, Image, CardBody, CardHeader, Spinner } from 'grommet'
import PokemonDetailsDropdown from '../PokemonDetailsDropdown'
import { useFetcher } from '../../hooks/useFetcher'
import { useState, useEffect } from 'react'

const PokemonCard = ({pokemonBasicData, index}) => {
    const { name } = pokemonBasicData
    const { fetchPokemon, data } = useFetcher()
    const [ showDropdown, setShowDropdown ] = useState('')

    useEffect(() => {
        fetchPokemon(name) 
    }, [name])

    const handleDropdown = () => {
        if(name && !showDropdown) {
            setShowDropdown(index)
        } else if (data && showDropdown) {
            setShowDropdown('')
        } else {
            setShowDropdown('')
        }
    }
   
   return data ? (
            <Card width="medium" height="medium">
                <CardHeader pad="small" direction="column">
                        <Image src={data.sprites.front_default} />
                        <Heading level={2} size="small" margin="none">{name}</Heading>
                        <Button onClick={handleDropdown} secondary label="details"/>
                    </CardHeader>
                    <CardBody pad="small">
                { showDropdown === index && <PokemonDetailsDropdown pokemonDetail={data} /> }
                </CardBody>
            </Card>
        )
        : <Spinner />
}

export default PokemonCard