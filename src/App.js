import { Grommet, Main } from 'grommet'
import { grommet } from 'grommet/themes';
import Header from './Components/Header'
import MainPage from './Components/pages/Main'

import SearchProvider from './store/SearchContext'

const App = () => {
  window.addEventListener('locationchange', function(){
    console.log('location changed!');
})
  return (
      <SearchProvider>
        <Grommet theme={grommet}>
          <Main pad="large" align="center" justify="center">
            <Header />
            <MainPage />
          </Main>
        </Grommet>
      </SearchProvider>
  );
}

export default App;

