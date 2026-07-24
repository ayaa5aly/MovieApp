import MovieCard from "@/components/MovieCard";
import {
  OmdbError,
  omdbSearchResultToMovie,
  searchMovies,
} from "@/lib/omdb";

function ResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-surface border border-border rounded-sm overflow-hidden animate-pulse"
        >
          <div className="aspect-[2/3] bg-surface-alt" />
          <div className="px-4 py-3 space-y-2">
            <div className="h-4 bg-surface-alt rounded-sm w-3/4" />
            <div className="h-3 bg-surface-alt rounded-sm w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-sm border border-accent bg-surface px-5 py-4 text-sm"
    >
      <p className="font-mono text-xs uppercase tracking-wide text-accent mb-1">
        Search unavailable
      </p>
      <p className="text-muted">{message}</p>
    </div>
  );
}

function EmptyMessage({ query }: { query: string }) {
  return (
    <p className="text-muted text-sm max-w-md">
      No movies matched &ldquo;{query}&rdquo;. Try a different spelling or a
      shorter title.
    </p>
  );
}

function PromptMessage() {
  return (
    <p className="text-muted text-sm max-w-md">
      Enter a title above to search the OMDb catalog.
    </p>
  );
}

export function SearchResultsFallback() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-2xl tracking-wide">Results</h2>
        <p className="font-mono text-xs text-muted uppercase">Loading…</p>
      </div>
      <ResultsSkeleton />
    </section>
  );
}

export default async function SearchResults({
  query,
}: {
  query?: string;
}) {
  const trimmed = query?.trim();

  if (!trimmed) {
    return (
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="font-display text-2xl tracking-wide mb-6">Results</h2>
        <PromptMessage />
      </section>
    );
  }

  try {
    const results = await searchMovies(trimmed);
    const movies = results.map(omdbSearchResultToMovie);

    return (
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
          <h2 className="font-display text-2xl tracking-wide">Results</h2>
          <p className="font-mono text-xs text-muted uppercase">
            {movies.length} title{movies.length === 1 ? "" : "s"} for &ldquo;
            {trimmed}&rdquo;
          </p>
        </div>

        {movies.length === 0 ? (
          <EmptyMessage query={trimmed} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    );
  } catch (err) {
    const message =
      err instanceof OmdbError
        ? err.message
        : "Something went wrong while searching. Please try again.";

    return (
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="font-display text-2xl tracking-wide mb-6">Results</h2>
        <ErrorMessage message={message} />
      </section>
    );
  }
}
