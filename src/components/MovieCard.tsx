import Link from "next/link";
import { Movie } from "@/lib/types";

// Server Component — static per card, no client interactivity needed.
export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group block bg-surface border border-border rounded-sm overflow-hidden hover:border-accent-gold transition-colors"
    >
      <div className="aspect-[2/3] bg-surface-alt flex items-center justify-center">
        <span className="font-display text-4xl text-muted tracking-wide">
          {movie.title
            .split(" ")
            .map((w) => w[0])
            .slice(0, 3)
            .join("")}
        </span>
      </div>
      <div className="stub-cut px-4 py-3">
        <h3 className="font-sans font-semibold text-sm leading-snug group-hover:text-accent-gold transition-colors">
          {movie.title}
        </h3>
        <div className="mt-1 flex items-center justify-between font-mono text-xs text-muted">
          <span>{movie.year}</span>
          <span className="text-accent-gold">★ {movie.rating}</span>
        </div>
      </div>
    </Link>
  );
}
