export const limitNumber = 30

export const colorByType = (types) => {
    types.map(type => {
        switch(type){
            case 'normal': 
                return '#A8A77A'
            case 'fighting':
                return '#C22E28'
            case 'flying':
                return '#A98FF3'
            case 'poison':
                return '#A33EA1'
            case 'ground':
                return '#E2BF65'
            case 'rock':
                return '#B6A136'
            case 'bug':
                return '#A6B91A'
            case 'ghost': 
                return '#735797'
            case 'steel':
                return '#B7B7CE'
            case 'fire':
                return '#EE8130'
            case 'water':
                return '#6390F0'
            case 'grass': 
                return '#7AC74C'
            case 'electric':
                return '#F7D02C'
            case 'psychic':
                return '#F95587'
            case 'ice':
                return '#96D9D6'
            case 'dragon':
                return '#6F35FC'
            case 'dark':
                return '#705746'
            case 'fairy':
                return '#D685AD'
            default: 
                return '#777' 
        }

    })
}
