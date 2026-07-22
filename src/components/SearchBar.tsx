"use client";

import { useState } from "react";

// Client Component — needs interactivity (controlled input, submit handling).
// Wired up to the OMDB search in Phase 3: Build (core).
export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full max-w-xl mx-auto border-2 border-accent-gold rounded-sm overflow-hidden"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a title…"
        className="flex-1 bg-surface px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted focus:outline-none"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-accent-gold text-background font-mono text-xs uppercase tracking-wide hover:bg-accent-gold/90 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
