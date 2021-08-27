import { Card, Heading, CardBody, Spinner } from 'grommet'
import { StyledCardHeader } from './PokemonCard.module'
import PokemonDetailsTabs from '../PokemonDetailsTabs'
import { colorByType } from '../../constants'

const PokemonCard = ({pokemonBasicData}) => {
    const { name, types, id, sprites } = pokemonBasicData
    const colorOfFirstType = colorByType(types)[0]
    const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1)
    const sprite = sprites.other['official-artwork'].front_default

   return pokemonBasicData ? (
            <Card width='medium' height="large" margin={{bottom: '30px'}}>
                <StyledCardHeader pad="small" direction="column" background={colorOfFirstType} sprite={sprite} height='medium'>
                        <p style={{ alignSelf: 'flex-start'}}>#{id}</p>
                        <Heading level={2} size="small" margin="none" style={{backgroundColor: colorOfFirstType}}>{capitalizeName}</Heading>
                    </StyledCardHeader>
                    <CardBody pad="small" >
                <PokemonDetailsTabs pokemonDetail={pokemonBasicData} />
                </CardBody>
            </Card>
        )
        : <Spinner />
}

export default PokemonCard