export const filterPokemonListByType = (type, setAdvacedSearchList, pokemonDetail) => {
    if(pokemonDetail) {
        const filterPokemon = pokemonDetail.map(pokemon => {
            const filterTypes = pokemon.types.map(pokemonType => pokemonType.type.name === type ? pokemon.name : '' )
            return pokemon.name === filterTypes.join('') ? pokemon : ''
        })

        const sanitizeFilterPokemon = filterPokemon.filter(e => e)
        setAdvacedSearchList(sanitizeFilterPokemon)
    }
}