import { Tabs, Tab, Box, Meter, Text, Tip, List} from 'grommet'
import { usePokemonList } from '../../hooks/usePokemonList'
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

const PokemonDetailsDropdown = ({pokemonDetail}) => {
    const {types, abilities, stats, weight, height, name } = pokemonDetail
    const { fetchPokemonEvolutionChain } = usePokemonList()
    const [ evolutionChain, setEvolutionChain ] = useState([])
    const pokemonTypes = types.map(type => type.type.name)
    const typeName = pokemonTypes.map(type => type)
    const location = useLocation();

    const getEvolutionChain = async (name) => {
        const chain = await fetchPokemonEvolutionChain(name)
        const evolvesFrom = chain.evolves_from_species && chain.evolves_from_species.name ? <p> Evolves from: {chain.evolves_from_species?.name}</p> : <p>First of evolution chain</p>
        setEvolutionChain(evolvesFrom)
    }

    useEffect(() => {
        getEvolutionChain(name)
    }, [location.pathname])

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
        <Tabs>
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
                {evolutionChain}
                </Box>
            </Tab>
            </Tabs>
    )
}

export default PokemonDetailsDropdown