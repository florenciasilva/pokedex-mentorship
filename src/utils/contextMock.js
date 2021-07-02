import * as SearchContext from '../store/SearchContext'
import * as DataProvider from '../store/DataContext'
import { allData } from '../testData'

export const contextMock = () => {
const contextValues = { data: allData, err: '', fetchAllPokemon: jest.fn() };
const contextSearchValues = { search: '', setSearch: jest.fn() }

jest
    .spyOn(SearchContext, 'useSearchContext')
    .mockImplementation(() => contextSearchValues);
jest
    .spyOn(DataProvider, 'useDataContext')
    .mockImplementation(() => contextValues);

}