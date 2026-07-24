import { Suspense } from "react";
import FeaturedMovies, {
  FeaturedMoviesFallback,
} from "@/components/FeaturedMovies";
import SearchBar from "@/components/SearchBar";
import SearchResults, {
  SearchResultsFallback,
} from "@/components/SearchResults";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold mb-3">
          Now Showing
        </p>
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl tracking-wide mb-6">
          Find your next watch
        </h1>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </section>

      <div className="filmstrip" />

      <Suspense fallback={<FeaturedMoviesFallback />}>
        <FeaturedMovies />
      </Suspense>

      {q?.trim() && (
        <>
          <div className="filmstrip" />
          <Suspense key={q} fallback={<SearchResultsFallback />}>
            <SearchResults query={q} />
          </Suspense>
        </>
      )}
    </div>
  );
}

function SearchBarFallback() {
  return (
    <div
      className="flex w-full max-w-xl mx-auto border-2 border-accent-gold rounded-sm overflow-hidden animate-pulse"
      aria-hidden
    >
      <div className="flex-1 bg-surface px-4 py-3 h-12" />
      <div className="w-20 sm:w-24 bg-accent-gold/50" />
    </div>
  );
}
