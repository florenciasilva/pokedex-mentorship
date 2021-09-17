export const overviewListData = (typeName, weight, height, getAbilities) => [
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