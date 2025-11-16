import { STATUS_LABELS } from '../graphql/statusLabels';
import DOMPurify from 'dompurify';

export default function Card({ item }) {
  const englishTitle = item.title.english;
  const romajiTitle = item.title.romaji;
  const showRomaji =
    englishTitle &&
    romajiTitle &&
    englishTitle.toLowerCase() !== romajiTitle.toLowerCase();
  const genresLength = (genres) => {
    if (!genres) return;
    return Array.isArray(genres) ? genres.length : 1;
  };

  return (
    <div className='flex overflow-hidden rounded-lg bg-neutral-300 px-4 py-6 dark:bg-neutral-800'>
      <div className='card-image max-w-45 max-h-65 shrink-0 overflow-hidden rounded-lg'>
        <img
          className='aspect-9/13 h-full w-full object-cover'
          src={item.coverImage.large}
          alt={`Cover Image of ${englishTitle || romajiTitle}`}
          loading='lazy'
        />
      </div>
      <div className='card-info pl-4 flex flex-col'>
        {/* title */}
        <div className='mb-2 text-m'>
          <div className='text-base'>{englishTitle || romajiTitle}</div>
          {showRomaji && (
            <div className='text-xs text-neutral-500'>{romajiTitle}</div>
          )}
        </div>
        {/* genres */}
        <div
          className={`mb-2 text-xs text-neutral-400 ${
            !!genresLength(item.genres) ? 'visible' : ''
          }`}
        >
          <div>{(item.genres ?? []).join(' • ')}</div>
          <div>
            {[item.format, item.seasonYear, STATUS_LABELS[item.status]]
              .filter(Boolean)
              .join(' • ')}
          </div>
        </div>
        {/* description */}
        <div className='h-full'>
          <p
            className='leading-tight line-clamp-7 text-neutral-300'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(item.description),
            }}
          />
        </div>
      </div>
    </div>
  );
}
