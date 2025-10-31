export default function Card({ item }) {
  return (
    <div className='flex overflow-hidden rounded-lg bg-neutral-300 px-4 py-6 dark:bg-neutral-800'>
      <div className='max-w-45 shrink-0 overflow-hidden rounded-lg'>
        <img
          className='aspect-9/13 h-full w-full object-cover'
          src={item.coverImage.large}
          alt={`Cover Image of ${item.title.english || item.title.romaji}`}
          loading='lazy'
        />
      </div>
      <div className='pl-4'>
        <div className='text-base'>
          {item.title.english || item.title.romaji}
        </div>
        {!!item.title.english &&
        item.title.english.toLowerCase() !== item.title.romaji.toLowerCase() ? (
          <div className='text-xs text-neutral-500'>{item.title.romaji}</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
