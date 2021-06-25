import { useState } from 'react';

import {
  Box,
  Button,
  Form,
  FormField,
  TextInput,
} from 'grommet';
import { usePokemonSimpleSearch } from '../../hooks/usePokemonSimpleSearch'

export const Search = () => {
  const [ pokemonSimpleSearch, setPokemonSimpleSearch ] = useState('');
  const { onSearchSubmit } = usePokemonSimpleSearch()

  return (
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            onReset={() => {
                setPokemonSimpleSearch('');
            }}
            onSubmit={() => onSearchSubmit(pokemonSimpleSearch)}
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