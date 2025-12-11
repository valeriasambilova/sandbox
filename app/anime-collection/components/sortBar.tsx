'use client';

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { DEFAULT_SORT, SORT_OPTIONS } from '../graphql/sortOptions';
import { useUrlParams } from '../hooks/useUrlParams';

export default function SortBar({
  sort = DEFAULT_SORT,
}: {
  sort: string | string[] | undefined;
}) {
  const { updateParam } = useUrlParams();

  return (
    <Menu>
      <MenuButton>
        Sort By: {SORT_OPTIONS.find((item) => item.name === sort)?.label}
      </MenuButton>
      <MenuItems anchor="bottom" modal={false}>
        {SORT_OPTIONS.map((item) => {
          return (
            <MenuItem key={item.name}>
              <button
                className="block"
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
