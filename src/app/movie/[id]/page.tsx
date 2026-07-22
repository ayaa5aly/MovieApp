import { MOCK_MOVIES } from "@/lib/mock-movies";
import { notFound } from "next/navigation";

// Server Component — reads route params, no interactivity needed yet.
// Real OMDB detail fetch + a client "Add to favorites" button land in Phase 3.
export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = MOCK_MOVIES.find((m) => m.id === id);

  if (!movie) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold mb-3">
        Ticket #{movie.id}
      </p>
      <h1 className="font-display text-5xl tracking-wide mb-6">{movie.title}</h1>

      <div className="grid grid-cols-[160px_1fr] gap-8">
        <div className="aspect-[2/3] bg-surface-alt border border-border rounded-sm flex items-center justify-center">
          <span className="font-display text-3xl text-muted">
            {movie.title
              .split(" ")
              .map((w) => w[0])
              .slice(0, 3)
              .join("")}
          </span>
        </div>
        <div className="stub-cut pl-8 border-t-0 border-l-2">
          <dl className="grid grid-cols-2 gap-y-3 font-mono text-sm">
            <dt className="text-muted">Year</dt>
            <dd>{movie.year}</dd>
            <dt className="text-muted">Genre</dt>
            <dd>{movie.genre}</dd>
            <dt className="text-muted">Rating</dt>
            <dd className="text-accent-gold">★ {movie.rating}</dd>
          </dl>
          <button
            disabled
            className="mt-8 px-5 py-2 bg-accent text-foreground rounded-sm text-sm opacity-50 cursor-not-allowed"
            title="Wired up once authentication ships in Phase 3"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}
