import { Card, Heading, Button, Image, CardBody, CardHeader, Spinner } from 'grommet'
import PokemonDetailsDropdown from '../PokemonDetailsDropdown'
import { useState } from 'react'

const PokemonCard = ({pokemonBasicData, index}) => {
    const { name } = pokemonBasicData
    const [ showDropdown, setShowDropdown ] = useState('')

    const handleDropdown = () => {
        if(pokemonBasicData && !showDropdown) {
            setShowDropdown(index)
        } else if (pokemonBasicData && showDropdown) {
            setShowDropdown('')
        } else {
            setShowDropdown('')
        }
    }
   
   return pokemonBasicData ? (
            <Card width="medium" height="medium">
                <CardHeader pad="small" direction="column">
                        <Image src={pokemonBasicData.sprites.front_default} />
                        <Heading level={2} size="small" margin="none">{name}</Heading>
                        <Button onClick={handleDropdown} secondary label="details"/>
                    </CardHeader>
                    <CardBody pad="small">
                { showDropdown === index && <PokemonDetailsDropdown pokemonDetail={pokemonBasicData} /> }
                </CardBody>
            </Card>
        )
        : <Spinner />
}

export default PokemonCard