'use client';

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { SORT_OPTIONS } from '../graphql/sortOptions';
import { useUrlParams } from '../hooks/useUrlParams';

export default function SortBar({ sortBy }: { sortBy: string }) {
  const { updateParam } = useUrlParams();

  const sort = (sort: string) => {
    updateParam('sort', sort);
  };

  return (
    <Menu>
      <MenuButton>
        {SORT_OPTIONS.find((item) => item.name === sortBy)?.label}
      </MenuButton>
      <MenuItems anchor='bottom' modal={false}>
        {SORT_OPTIONS.map((item) => {
          return (
            <MenuItem key={item.name}>
              <button className='block' onClick={() => sort(item.name)}>
                {item.label}, {item.description}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
