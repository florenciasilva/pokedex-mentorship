import { createContext, useContext, useState } from 'react';

const SearchContext = createContext(null);

const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(`Can't use "useSearchContext" without an Provider!`);
  }
  return context;
};

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [advancedSearch, setAdvancedSearch] = useState('');

  return (
    <SearchContext.Provider value={{ search, setSearch, advancedSearch, setAdvancedSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export { useSearchContext };
export default SearchProvider;
