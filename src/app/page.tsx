import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { MOCK_MOVIES } from "@/lib/mock-movies";

// Server Component by default — this route has no client-only state itself.
export default function HomePage() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold mb-3">
          Now Showing
        </p>
        <h1 className="font-display text-6xl md:text-7xl tracking-wide mb-6">
          Find your next watch
        </h1>
        <SearchBar />
      </section>

      <div className="filmstrip" />

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-2xl tracking-wide">Featured</h2>
          <p className="font-mono text-xs text-muted uppercase">
            Placeholder data — live search lands in Phase 3
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {MOCK_MOVIES.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
