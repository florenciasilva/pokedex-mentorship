import { Tabs, Tab, Box, Meter, Text, Tip, List} from 'grommet'
import { usePokemonList } from '../../hooks/usePokemonList'
import { useState, useEffect } from 'react'

const PokemonDetailsDropdown = ({pokemonDetail}) => {
    const {types, abilities, stats, weight, height, id, sprite } = pokemonDetail
    const { fetchPokemonEvolutionChain } = usePokemonList()
    const [ evolutionChain, setEvolutionChain ] = useState([])
    const pokemonTypes = types.map(type => type.type.name)
    const typeName = pokemonTypes.map(type => type)

    const getEvolutionChain = async () => {
        let evoChain = [];
        const chain = await fetchPokemonEvolutionChain(id)
        let evoData = chain.chain;
        do {
        let numberOfEvolutions = evoData['evolves_to'].length;  

        evoChain.push({
            "species_name": evoData.species.name,
            "min_level": !evoData ? 1 : evoData.min_level,
            "trigger_name": !evoData ? null : evoData.trigger_name,
            "item": !evoData ? null : evoData.item
        });

        if(numberOfEvolutions > 1) {
            for (let i = 1;i < numberOfEvolutions; i++) { 
            evoChain.push({
                "species_name": evoData.evolves_to[i].species.name,
                "min_level": !evoData.evolves_to[i]? 1 : evoData.evolves_to[i].min_level,
                "trigger_name": !evoData.evolves_to[i]? null : evoData.evolves_to[i].trigger_name,
                "item": !evoData.evolves_to[i]? null : evoData.evolves_to[i].item
            });
            }
        }        

        evoData = evoData['evolves_to'][0]

        } while (!!evoData && evoData.hasOwnProperty('evolves_to'))

        setEvolutionChain(evoChain)
        return evoChain
    }

    useEffect(() => {
        getEvolutionChain()
    }, [])

    const getAbilities = () => abilities.map((ability, i) => <span>{ability.ability.name} {i === 0 && '| '}</span>)
    const statsColorRange = (statName) => {
        switch(statName){
            case 'hp': 
                return '#FF4040'
            case 'attack':
                return '#00C781'
            case 'defense':
                return '#FFAA15'
            case 'speed':
                return '#00739D'
        }
    }
    const getStats = () => stats.map((stat, i) => {
        const getBaseStats = stat.stat.name === 'special-attack' || stat.stat.name === 'special-defense' ? null : stat
        return getBaseStats && (
        <>
        <Text size="small" weight="bold">
        {getBaseStats.stat.name}
         </Text>
         <Tip content={getBaseStats.base_stat} plain dropProps={{ align: { left: 'right' } }}>
        <Meter
            values={[{
                value: getBaseStats.base_stat,
                label: getBaseStats.stat.name,
                color: statsColorRange(getBaseStats.stat.name)
            }]}
            aria-label="meter"
        />
        </Tip>
        </>
        )
    })

    
    const overviewListData = [
        {
            title: 'Type',
            data: typeName
        },
        {
            title: 'Weight',
            data: weight
        },
        {
            title: 'Height',
            data: height
        },
        {
            title: 'Abilities',
            data: getAbilities()
        },
    ]

    return (
        <Tabs onActive={(e) => console.log('hola', e.target)}>
            <Tab title="Overview">
                <Box pad="small">
                <List data={overviewListData.slice(0, overviewListData.length)}
                    primaryKey={item => (
                    <Text size="small" weight="bold" color="dark-4">
                        {item.title}
                    </Text>
                    )}
                    secondaryKey={item => (
                        <Text size="medium" >
                          {item.data}
                        </Text>
                      )}
                />
                </Box>
            </Tab>
            <Tab title="Stat Detail">
                <Box pad="small">
                {getStats()}
                </Box>
            </Tab>
            <Tab title="Evolutions">
                <Box pad="small">
                {console.log(evolutionChain)}
                {evolutionChain.map(pokemon => <p>{pokemon.species_name}</p>)}
                </Box>
            </Tab>
            </Tabs>
    )
}

export default PokemonDetailsDropdown