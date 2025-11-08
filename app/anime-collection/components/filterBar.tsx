'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Filters } from '../graphql/cachedFilters';

interface FilterBarProps {
  filters: Filters;
  genre: string | string[] | undefined;
  status: string | undefined;
}

export default function FilterBar({ filters, genre, status }: FilterBarProps) {
  console.log(filters);

  return (
    <Menu>
      <MenuButton>My account</MenuButton>
      <MenuItems anchor='bottom' modal={false}>
        <MenuItem>
          <a className='block data-focus:bg-blue-100' href='/settings'>
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a className='block data-focus:bg-blue-100' href='/support'>
            Support
          </a>
        </MenuItem>
        <MenuItem>
          <a className='block data-focus:bg-blue-100' href='/license'>
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
