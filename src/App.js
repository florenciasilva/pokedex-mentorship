import { Grommet, Main } from 'grommet'
import { grommet } from 'grommet/themes';
import Header from './Components/Header'
import MainPage from './Components/pages/Main'
import { BrowserRouter as Router } from 'react-router-dom'
import SearchProvider from './store/SearchContext'

const App = () => {
  return (
    <Router>
      <SearchProvider>
        <Grommet theme={grommet}>
          <Main pad="large" align="center" justify="center">
            <Header />
            <MainPage />
          </Main>
        </Grommet>
      </SearchProvider>
    </Router>
  );
}

export default App;

