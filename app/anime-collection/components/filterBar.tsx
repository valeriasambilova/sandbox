'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Filters } from '../graphql/cachedFilters';
import { useUrlParams } from '../hooks/useUrlParams';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { useState } from 'react';

interface FilterBarProps {
  filters: Filters;
  genre: string | string[] | undefined;
  status: string | string[] | undefined;
}

export default function FilterBar({ filters, genre, status }: FilterBarProps) {
  const { updateParam } = useUrlParams();

  const [selectedGenres, setSelectedGenres] = useState(
    Array.isArray(genre) ? genre : [genre]
  );

  return (
    <>
      <Menu>
        <MenuButton>
          Genre: {filters.genres.find((name) => name === genre) || 'Any'}
        </MenuButton>
        <MenuItems anchor='bottom' modal={false}>
          {filters.genres.map((name) => {
            return (
              <MenuItem key={name}>
                <button
                  className='block'
                  onClick={() => updateParam('genre', name)}
                >
                  {name}
                </button>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
      {/* <Listbox
        value={Array.isArray(genre) ? genre : [genre || '']}
        onChange={(item: string) => updateParam('genre', item)}
        multiple
      >
        <ListboxButton>{selectedGenres}</ListboxButton>
        <ListboxOptions anchor='bottom'>
          {filters.genres.map((name) => (
            <ListboxOption
              key={name}
              value={name}
              className='data-focus:bg-blue-100'
            >
              {name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox> */}
    </>
  );
}
