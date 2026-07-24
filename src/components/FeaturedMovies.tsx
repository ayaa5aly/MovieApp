import MovieCard from "@/components/MovieCard";
import { FEATURED_IMDB_IDS } from "@/lib/featured";
import { getMovieById, omdbDetailToMovie } from "@/lib/omdb";

function FeaturedSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
      {Array.from({ length: FEATURED_IMDB_IDS.length }).map((_, i) => (
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

export function FeaturedMoviesFallback() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="font-display text-2xl tracking-wide mb-6">Featured</h2>
      <FeaturedSkeleton />
    </section>
  );
}

export default async function FeaturedMovies() {
  const results = await Promise.allSettled(
    FEATURED_IMDB_IDS.map((id) => getMovieById(id)),
  );

  const movies = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => omdbDetailToMovie(result.value));

  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
        <h2 className="font-display text-2xl tracking-wide">Featured</h2>
        <p className="font-mono text-xs text-muted uppercase">Curated picks</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
