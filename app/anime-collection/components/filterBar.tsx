'use client';

import { Filters } from '../graphql/cachedFilters';
import { useUrlParams } from '../hooks/useUrlParams';
import {
  Button,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

interface FilterBarProps {
  filters: Filters;
  genre: string | string[] | undefined;
  status: string | string[] | undefined;
}

export default function FilterBar({ filters, genre, status }: FilterBarProps) {
  const { updateArrayParam, deleteParam } = useUrlParams();
  const selectedGenres = Array.isArray(genre) ? genre : [genre].filter(Boolean);

  return (
    <>
      <Listbox
        value={selectedGenres}
        onChange={(selected) => updateArrayParam('genre', selected)}
        multiple
      >
        <ListboxButton>
          Genres:{' '}
          {selectedGenres.length === 0 ? 'All' : selectedGenres.join(', ')}
        </ListboxButton>
        {selectedGenres.length > 0 && (
          <Button onClick={() => deleteParam('genre')}>
            <XMarkIcon className="h-4 w-4" />
          </Button>
        )}
        <ListboxOptions anchor="bottom" modal={false}>
          {filters.genres.map((item) => (
            <ListboxOption
              key={item}
              value={item}
              className="data-focus:bg-blue-100"
            >
              {item}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </>
  );
}
