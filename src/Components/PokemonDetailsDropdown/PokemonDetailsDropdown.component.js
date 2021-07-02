
const PokemonDetailsDropdown = ({pokemonDetail}) => {
    const {id, types } = pokemonDetail

    const pokemonTypes = types.map((type, i) => <p key={i}>{type.type.name}</p>)
    return (
        <>
          <p>{id}</p>
          {pokemonTypes}
        </>
    )
}

export default PokemonDetailsDropdown