import { Grommet, Main } from 'grommet'
import { grommet } from 'grommet/themes';
import Header from './Components/Header'
import CardList from './Components/CardList/CardList.component';
import SearchProvider from './store/SearchContext'

// agregar usePokemonSimpleSearch como contexto.

const App = () => {
  return (
    <SearchProvider>
      <Grommet theme={grommet}>
        <Main pad="large" align="center" justify="center">
          <Header />
          <CardList  />
        </Main>
      </Grommet>
    </SearchProvider>
  );
}

export default App;

