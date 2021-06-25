import { useState } from 'react';

import {
  Box,
  Button,
  Form,
  FormField,
  TextInput,
} from 'grommet';

export const Search = () => {
  const [pokemonSimpleSearch, setPokemonSimpleSearch] = useState('');
  return (
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            onChange={value => console.log('Change', value)}
            onReset={() => {
                setPokemonSimpleSearch('');
            }}
            onSubmit={event =>
              console.log('Submit', event.value, event.touched)
            }
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