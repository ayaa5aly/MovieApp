import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/types";

function PosterFallback({ title }: { title: string }) {
  return (
    <span className="font-display text-3xl sm:text-4xl text-muted tracking-wide">
      {title
        .split(" ")
        .map((w) => w[0])
        .slice(0, 3)
        .join("")}
    </span>
  );
}

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group block bg-surface border border-border rounded-sm overflow-hidden hover:border-accent-gold transition-colors"
    >
      <div className="aspect-[2/3] bg-surface-alt flex items-center justify-center relative overflow-hidden">
        {movie.poster ? (
          <Image
            src={movie.poster}
            alt={`${movie.title} poster`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          />
        ) : (
          <PosterFallback title={movie.title} />
        )}
      </div>
      <div className="stub-cut px-3 sm:px-4 py-3">
        <h3 className="font-sans font-semibold text-sm leading-snug group-hover:text-accent-gold transition-colors line-clamp-2">
          {movie.title}
        </h3>
        <div className="mt-1 flex items-center justify-between font-mono text-xs text-muted gap-2">
          <span className="truncate">{movie.year}</span>
          {movie.rating !== "—" && (
            <span className="text-accent-gold shrink-0">★ {movie.rating}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
