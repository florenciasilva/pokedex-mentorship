import { useState } from 'react';

import {
  Box,
  Button,
  Form,
  FormField,
  TextInput,
} from 'grommet';
import { useSearchContext } from '../../store/SearchContext'

export const Search = () => {
  const [ pokemonSimpleSearch, setPokemonSimpleSearch ] = useState('');
  const { setSearch } = useSearchContext()

  return (
      <Box pad="medium" align="center" justify="center">
          <Form
            onReset={() => {
                setPokemonSimpleSearch('');
            }}
            onSubmit={() => setSearch(pokemonSimpleSearch.toLowerCase())}
          >
            <FormField label="Search" name="pokemon simple search">
              <TextInput
                name="pokemonSimpleSearch"
                value={pokemonSimpleSearch}
                onChange={event => setPokemonSimpleSearch(event.target.value)}
              />
            </FormField>
            <Box direction="row" justify="center" margin={{ top: 'medium' }}>
              <Button type="submit" label="Search" primary />
            </Box>
          </Form>
        </Box>
  );
};

export default Search