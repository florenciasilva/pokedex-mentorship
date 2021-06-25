import { Grommet, Main } from 'grommet'
import { grommet } from 'grommet/themes';
import Header from './Components/Header'
import CardList from './Components/CardList/CardList.component';

const App = () => {
  return (
      <Grommet theme={grommet}>
        <Main pad="large" align="center" justify="center">
          <Header />
          <CardList  />
        </Main>
      </Grommet>
  );
}

export default App;

