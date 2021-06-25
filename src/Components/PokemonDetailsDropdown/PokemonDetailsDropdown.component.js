
import { Image } from 'grommet'

const PokemonDetailsDropdown = ({pokemonDetail}) => {
    const { sprites, id, types } = pokemonDetail

    const pokemonSpriteURL = sprites.back_default
    const pokemonTypes = types.map((type, i) => <p key={i}>{type.type.name}</p>)
    return (
        <>
          <p>{id}</p>
          {pokemonTypes}
          <Image fit="cover" fill src={pokemonSpriteURL} />
        </>
    )
}

export default PokemonDetailsDropdown