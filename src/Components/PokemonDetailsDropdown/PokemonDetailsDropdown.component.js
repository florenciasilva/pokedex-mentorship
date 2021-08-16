import Modal from '../Modal'

const PokemonDetailsDropdown = ({pokemonDetail}) => {
    const {id, types } = pokemonDetail
   
    const pokemonTypes = types.map(type => type.type.name)
    const typeJSX = pokemonTypes.map((type, i) => <p key={i}>{type}</p>)

    console.log(pokemonTypes)
    return (
        <>
        <p>{id}</p>
        <Modal pokemonDetail={pokemonDetail} />
        {typeJSX}
        </>
    )
}

export default PokemonDetailsDropdown