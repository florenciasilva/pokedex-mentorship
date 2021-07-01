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
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            onReset={() => {
                setPokemonSimpleSearch('');
            }}
            onSubmit={() => setSearch(pokemonSimpleSearch)}
          >
            <FormField label="Search" name="pokemon simple search">
              <TextInput
                name="pokemonSimpleSearch"
                value={pokemonSimpleSearch}
                onChange={event => setPokemonSimpleSearch(event.target.value)}
              />
            </FormField>
            <Box direction="row" justify="end" margin={{ top: 'medium' }}>
              <Button type="submit" label="Update" primary />
            </Box>
          </Form>
        </Box>
      </Box>
  );
};

export default Search