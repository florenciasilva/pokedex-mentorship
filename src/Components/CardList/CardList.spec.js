import { render } from '@testing-library/react'
import CardList from './CardList.component'
import { contextMock } from '../../utils/contextMock'

contextMock()
jest.mock("react-router-dom", () => ({
    useLocation: () => ({
      pathname: "localhost:3000/"
    })
  }));
const wrapper = render(
    <CardList />
)

describe('CardList', () => {
    it('Should render list of cards if data is available', () => {
        expect(wrapper.queryByTestId('pokemon-card')).not.toEqual(null);
    })
})
