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
    <div className="flex overflow-hidden rounded-lg bg-neutral-300 px-4 py-6 dark:bg-neutral-800">
      <div className="card-image max-h-65 max-w-45 shrink-0 overflow-hidden rounded-lg">
        <img
          className="aspect-9/13 h-full w-full object-cover"
          src={item.coverImage.large}
          alt={`Cover Image of ${englishTitle || romajiTitle}`}
          loading="lazy"
        />
      </div>
      <div className="card-info flex flex-col pl-4">
        <div>
          {/* title */}
          <div className="text-m mb-2">
            <div className="text-base">{englishTitle || romajiTitle}</div>
            {showRomaji && (
              <div className="text-xs text-neutral-500">{romajiTitle}</div>
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
        </div>
        {/* description */}
        <div className="h-full">
          <p
            className="scrollbar leading-tight text-neutral-300 hover:h-full lg:line-clamp-7 lg:hover:overflow-y-auto lg:hover:pr-1"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(item.description),
            }}
            onMouseEnter={(e) => (e.currentTarget.scrollTop = 0)}
            onMouseLeave={(e) => (e.currentTarget.scrollTop = 0)}
          />
        </div>
      </div>
    </div>
  );
}
