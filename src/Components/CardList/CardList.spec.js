import { render } from '@testing-library/react'
import CardList from './CardList.component'
import { contextMock } from '../../utils/contextMock'

contextMock()
const wrapper = render(
    <CardList />
)

describe('CardList', () => {
    it('Should render list of cards if data is available', () => {
        expect(wrapper.queryByTestId('pokemon-card')).not.toEqual(null);
    })
})
