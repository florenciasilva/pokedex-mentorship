import { Grommet, Main } from 'grommet'
import { grommet } from 'grommet/themes';
import Header from './Components/Header'

function App() {
  return (
    <Grommet theme={grommet}>
      <Main pad="large" align="center" justify="center">
        <Header />
      </Main>
    </Grommet>

  );
}

export default App;

