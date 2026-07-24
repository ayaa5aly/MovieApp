import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMovieById, OmdbError } from "@/lib/omdb";

function PosterFallback({ title }: { title: string }) {
  return (
    <span className="font-display text-3xl sm:text-4xl text-muted">
      {title
        .split(" ")
        .map((w) => w[0])
        .slice(0, 3)
        .join("")}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value || value === "N/A") return null;

  return (
    <>
      <dt className="text-muted">{label}</dt>
      <dd>{value}</dd>
    </>
  );
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let movie;

  try {
    movie = await getMovieById(id);
  } catch (err) {
    if (err instanceof OmdbError && err.code === "NOT_FOUND") {
      notFound();
    }

    const message =
      err instanceof OmdbError
        ? err.message
        : "Something went wrong loading this title.";

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-wide text-muted hover:text-accent-gold transition-colors"
        >
          ← Back to search
        </Link>
        <div
          role="alert"
          className="mt-8 rounded-sm border border-accent bg-surface px-5 py-4"
        >
          <p className="font-mono text-xs uppercase tracking-wide text-accent mb-1">
            Could not load movie
          </p>
          <p className="text-muted text-sm">{message}</p>
        </div>
      </div>
    );
  }

  const poster = movie.Poster !== "N/A" ? movie.Poster : undefined;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-wide text-muted hover:text-accent-gold transition-colors"
      >
        ← Back to search
      </Link>

      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold mt-8 mb-3">
        Ticket #{movie.imdbID}
      </p>
      <h1 className="font-display text-3xl sm:text-5xl tracking-wide mb-2">
        {movie.Title}
      </h1>
      <p className="font-mono text-sm text-muted mb-8">
        {movie.Year}
        {movie.Rated !== "N/A" ? ` · ${movie.Rated}` : ""}
        {movie.Runtime !== "N/A" ? ` · ${movie.Runtime}` : ""}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] lg:grid-cols-[200px_1fr] gap-6 lg:gap-8">
        <div className="mx-auto sm:mx-0 w-full max-w-[200px] sm:max-w-none">
          <div className="aspect-[2/3] bg-surface-alt border border-border rounded-sm flex items-center justify-center relative overflow-hidden">
            {poster ? (
              <Image
                src={poster}
                alt={`${movie.Title} poster`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 200px, 200px"
                priority
              />
            ) : (
              <PosterFallback title={movie.Title} />
            )}
          </div>
        </div>

        <div className="stub-cut sm:pl-6 lg:pl-8 sm:border-t-0 sm:border-l-2">
          {movie.Plot !== "N/A" && (
            <p className="text-sm sm:text-base leading-relaxed text-foreground/90 mb-6">
              {movie.Plot}
            </p>
          )}

          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 font-mono text-sm">
            <DetailRow label="Genre" value={movie.Genre} />
            <DetailRow label="Director" value={movie.Director} />
            <DetailRow label="Cast" value={movie.Actors} />
            <DetailRow label="Writer" value={movie.Writer} />
            <DetailRow label="Language" value={movie.Language} />
            <DetailRow label="Country" value={movie.Country} />
            <DetailRow label="Released" value={movie.Released} />
            <DetailRow label="Awards" value={movie.Awards} />
            {movie.imdbRating !== "N/A" && (
              <>
                <dt className="text-muted">IMDb rating</dt>
                <dd className="text-accent-gold">
                  ★ {movie.imdbRating}
                  {movie.imdbVotes !== "N/A"
                    ? ` (${movie.imdbVotes} votes)`
                    : ""}
                </dd>
              </>
            )}
          </dl>

          {movie.Ratings.length > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <p className="font-mono text-xs uppercase tracking-wide text-muted mb-2">
                More ratings
              </p>
              <ul className="space-y-1 font-mono text-sm">
                {movie.Ratings.map((rating) => (
                  <li key={rating.Source}>
                    {rating.Source}: {rating.Value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            disabled
            className="mt-8 w-full sm:w-auto px-5 py-2 bg-accent text-foreground rounded-sm text-sm opacity-50 cursor-not-allowed"
            title="Wired up once authentication ships in Phase 3"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}
