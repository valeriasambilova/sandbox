'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useSearchParams } from 'next/navigation';
import { Filters } from '../graphql/cachedFilters';

interface FilterBarProps {
  filters: Filters;
}

export default function FilterBar({ filters }: FilterBarProps) {
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre');
  const status = searchParams.get('status');

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
