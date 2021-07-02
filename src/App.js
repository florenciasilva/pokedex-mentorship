import { Grommet, Main } from 'grommet'
import { grommet } from 'grommet/themes';
import Header from './Components/Header'
import CardList from './Components/CardList/CardList.component';
import SearchProvider from './store/SearchContext'
import Pagination from './Components/Pagination'
import DataProvider from './store/DataContext'

const App = () => {

  return (
    <DataProvider>
      <SearchProvider>
        <Grommet theme={grommet}>
          <Main pad="large" align="center" justify="center">
            <Header />
            <CardList />
            <Pagination />
          </Main>
        </Grommet>
      </SearchProvider>
    </DataProvider>
  );
}

export default App;

