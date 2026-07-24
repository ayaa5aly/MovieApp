"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = query.trim();

    if (trimmed) {
      router.push(`/?q=${encodeURIComponent(trimmed)}`);
      return;
    }

    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl mx-auto border-2 border-accent-gold rounded-sm overflow-hidden"
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a title…"
        aria-label="Search for a movie title"
        className="flex-1 bg-surface px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted focus:outline-none min-w-0"
      />
      <button
        type="submit"
        className="px-4 sm:px-5 py-3 bg-accent-gold text-background font-mono text-xs uppercase tracking-wide hover:bg-accent-gold/90 transition-colors shrink-0"
      >
        Search
      </button>
    </form>
  );
}
