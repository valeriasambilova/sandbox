'use client';

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { SORT_OPTIONS } from '../graphql/sortOptions';
import { useUrlParams } from '../hooks/useUrlParams';
import { useSearchParams } from 'next/navigation';

export default function SortBar() {
  const searchParams = useSearchParams();
  const { updateParam } = useUrlParams();

  const sort = searchParams.get('sort') ?? 'START_DATE_DESC';

  return (
    <Menu>
      <MenuButton>
        {SORT_OPTIONS.find((item) => item.name === sort)?.label}
      </MenuButton>
      <MenuItems anchor='bottom' modal={false}>
        {SORT_OPTIONS.map((item) => {
          return (
            <MenuItem key={item.name}>
              <button
                className='block'
                onClick={() => updateParam('sort', item.name)}
              >
                {item.label}, {item.description}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
