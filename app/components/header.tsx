'use client';

import Link from 'next/link';

const navItems = {
  '/': {
    name: 'Home',
  },
  '/anime-collection': {
    name: 'Anime Collection',
  },
};

export function Header() {
  return (
    <header className='sticky top-0 z-50  border-b-1 border-b-neutral-800 bg-white tracking-tight dark:border-b-neutral-500 dark:bg-neutral-900'>
      <nav className='mx-auto max-w-7xl' id='nav'>
        <div className='flex flex-row space-x-0 pr-10'>
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                className='mx-2 px-2 py-5 transition-all hover:text-neutral-800 dark:hover:text-neutral-200'
              >
                {name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
