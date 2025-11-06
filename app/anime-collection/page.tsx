import List from './components/list';
import Example from './components/filterBar';
import SortBar from './components/sortBar';

export const metadata = {
  title: 'Anime Collection',
  description: 'Browse & Filter Anime from AniList.',
};

export default function Page({ searchParams }) {
  const { genre, status, sort = 'START_DATE_DESC' } = searchParams;

  return (
    <>
      <Example />
      <SortBar sortBy={sort} />
      <List />
    </>
  );
}
