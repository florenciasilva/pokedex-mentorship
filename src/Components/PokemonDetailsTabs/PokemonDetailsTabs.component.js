import { Tabs, Tab, Box, Meter, Text, Tip, List} from 'grommet'
import { usePokemonList } from '../../hooks/usePokemonList'
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { overviewListData } from '../../utils/pokemonDetailOverviewList'

const PokemonDetailsDropdown = ({pokemonDetail}) => {
    const {types, abilities, stats, weight, height, name } = pokemonDetail
    const { fetchPokemonEvolutionChain } = usePokemonList()
    const [ evolutionChain, setEvolutionChain ] = useState([])
    const pokemonTypes = types.map(type => type.type.name)
    const typeName = pokemonTypes.map((type, i) => <span>{type} {i === 0 && pokemonTypes.length > 1 ? '| ' : null}</span>)
    const location = useLocation();

    const getEvolutionChain = async (name) => {
        const chain = await fetchPokemonEvolutionChain(name)
        const evolvesFrom = chain.evolves_from_species && chain.evolves_from_species.name ? <p> Evolves from: {chain.evolves_from_species?.name}</p> : <p>First of evolution chain</p>
        setEvolutionChain(evolvesFrom)
    }

    useEffect(() => {
        getEvolutionChain(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    const getAbilities = () => abilities.map((ability, i) =>  <span>{ability.ability.name} {i === 0 && '| '}</span>)
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
            default: return ''
        }
    }
    const getStats = () => stats.map((stat, i) => {
        const getBaseStats = stat.stat.name === 'special-attack' || stat.stat.name === 'special-defense' ? null : stat
        return getBaseStats && (
        <>
        <Text size="small" weight="bold" key={stat.stat.name}>
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
    const overviewList = overviewListData(typeName, weight, height, getAbilities)

    return (
        <Tabs>
            <Tab title="Overview">
                <Box pad="small">
                <List data={overviewList.slice(0, overviewList.length)}
                    primaryKey={item => (
                    <Text size="small" weight="bold" color="dark-4" key={item.title}>
                        {item.title}
                    </Text>
                    )}
                    secondaryKey={item => (
                        <Text size="medium" key={item.data}>
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