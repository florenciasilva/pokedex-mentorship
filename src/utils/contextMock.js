import * as SearchContext from '../store/SearchContext'

export const contextMock = () => {
const contextSearchValues = { search: '', setSearch: jest.fn(), advancedSearch: '', setAdvancedSearch: jest.fn() }

jest
    .spyOn(SearchContext, 'useSearchContext')
    .mockImplementation(() => contextSearchValues);
}