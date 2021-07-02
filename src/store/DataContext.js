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


  // test con spyon y mockimpletementation

  const fetchAllPokemon = (url, offset) => {
    const pokeAPI = `https://pokeapi.co/api/v2/pokemon/${url}?limit=${limitNumber}&offset=${offset}`
    fetch(pokeAPI)
    .then(res => res.json())
    .then(res => setData(res))
    .catch(err => setErr(err))
  }

  return (
    <DataContext.Provider value={{ data, err, fetchAllPokemon }}>
      {children}
    </DataContext.Provider>
  );
};

export { useDataContext };
export default DataProvider;
