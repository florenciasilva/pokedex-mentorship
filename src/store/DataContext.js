import { createContext, useContext, useState } from 'react';
import { limitNumber } from '../constants'

const DataContext = createContext(null);

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error(`Can't use "useDataContext" without an Provider!`);
  }
  return context;
};

const DataProvider = ({ children }) => {
  const [ data, setData ] = useState()
  const [ err, setErr ] = useState()
  const [ typeList, setTypeList ] = useState()
  const [ listErr, setListErr ] = useState()

  // test con spyon y mockimpletementation


  /*
  
    Fetch base aparte, cada llamada aparte también.
  
  const fetchBase = (endpoint, setData, setError) => { 
    fetch(`https://pokeapi.co/api/v2/${endpoint}`)
    .then(res => res.json())
    .then(res => setter(res))
    .catch(err => setErr(err))

  }
*/

  const fetchAllPokemon = (url, offset) => {
    const pokeAPI = `https://pokeapi.co/api/v2/pokemon/${url}?limit=${limitNumber}&offset=${offset}`
    fetch(pokeAPI)
    .then(res => res.json())
    .then(res => setData(res))
    .catch(err => setErr(err))
  }

  const fetchPokemonTypeList = () => {
    const pokeAPI = 'https://pokeapi.co/api/v2/type/'
    fetch(pokeAPI)
    .then(res => res.json())
    .then(data => setTypeList(data.results))
    .catch(err => setListErr(err))
  }

  const fetchPokemonByType = (pokemon) => {
    const pokeAPI = `https://pokeapi.co/api/v2/type/${pokemon}`
    fetch(pokeAPI)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => setErr(err))
  }

  return (
    <DataContext.Provider value={{ data, err, fetchAllPokemon, fetchPokemonTypeList, typeList, fetchPokemonByType  }}>
      {children}
    </DataContext.Provider>
  );
};

export { useDataContext };
export default DataProvider;
