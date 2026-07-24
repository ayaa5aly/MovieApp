# Prompts Used During Development

This file logs the prompts I used with AI assistants (Claude and Cursor's agent) while building the search, movie detail page, and featured section for MovieApp ("Marquee").

---

## 1. Initial feature build (OMDb integration + search + detail page)

**Tool:** Cursor Agent (Composer / Sonnet 5)

```
I'm continuing work on a Next.js movie app called "MovieApp" (branded as "Marquee").
The project already has scaffolding done: routes, root layout, navigation, placeholder
pages for each screen, Tailwind set up, and it's deployed to Vercel with a working
preview URL. The homepage currently shows placeholder movie cards with the text
"PLACEHOLDER DATA – LIVE SEARCH LANDS IN PHASE 3".

Goal for this session: replace the placeholder data with real data from the OMDb API
and build out the core features.

Please do the following:

1. First, explore the current repo structure (routes, components, existing pages) so
   you understand what's already there before changing anything.

2. Set up the OMDb API integration:
   - Create a server-side utility function (e.g. lib/omdb.ts) to fetch data from OMDb.
   - Use an environment variable (OMDB_API_KEY) for the API key — never hardcode it.
     Add it to .env.local and make sure .env.local is in .gitignore. Add OMDB_API_KEY
     to .env.example with a placeholder value so I know what's needed.
   - Use Server Components for data fetching wherever possible; only use Client
     Components for interactive parts (like the search input/button).

3. Implement the search feature on the homepage:
   - The search input should call OMDb's search endpoint (s= parameter) and show
     matching movies as results, replacing the placeholder cards.
   - Handle loading and empty/no-results states.
   - Handle API errors gracefully (e.g. invalid key, no results, rate limit).

4. Implement a movie detail page (e.g. /movies/[id]):
   - Fetch full movie details from OMDb using the i= (IMDb ID) parameter.
   - Show poster, title, year, plot, genre, rating, cast, etc.
   - Link to it from the search results / featured cards.

5. Keep the existing "Marquee" dark theme and Tailwind design tokens consistent with
   what's already there — don't redesign, just wire up real data into the existing UI.

6. Make sure everything stays responsive at 375px and 1280px.

7. After each meaningful change, briefly tell me what you did and why.

Ask me before making any destructive changes. Let's go step by step — start with
step 1 and step 2, then pause so I can review before we move to search and the
detail page.

```

---

## 2. Security fix: exposed API key

**Tool:** Cursor Agent

```
I noticed .env.local has both OMDB_API_KEY and NEXT_PUBLIC_OMDB_API_KEY.
Please remove the NEXT_PUBLIC_ version — the API key should only be used
server-side (in lib/omdb.ts), never exposed to the client. Use OMDB_API_KEY
only, without the NEXT_PUBLIC_ prefix.

```

## 3. Route naming correction + continue build

**Tool:** Cursor Agent

```
Keep /movies/[id] as the route (not /movie/[id]). Please continue with
Step 3 and Step 4 as planned.

```

---

## 4. Featured section on homepage

**Tool:** Cursor Agent

```
Add a "Featured" section back to the homepage, below the hero/search area.

Requirements:
1. Create a small curated list of movie titles or IMDb IDs (5-6 well-known
   movies), e.g. as a constant array in a config file (lib/featured.ts or
   similar).

2. On the homepage (Server Component), fetch details for each of these IDs
   from OMDb (using the i= parameter) in parallel, and render them using
   the existing MovieCard component — same style as the search results.

3. Handle the case where OMDb fails for one of the IDs gracefully (skip
   that card, don't break the whole section).

4. Label the section "Featured" or "Now Showing", and keep it visually
   consistent with the rest of the Marquee theme.

5. Keep this separate from the search results — Featured should always
   show on the homepage regardless of whether the user has searched or not.

6. Make sure it's still responsive at 375px and 1280px.

```

---

## 5. Debugging support (used Claude, not Cursor)

While debugging a "Could not load movie — OMDb request failed (401)" error, I used Claude to help me isolate whether the problem was in my code or in the OMDb API key itself, by testing the raw OMDb endpoint directly in the browser (`http://www.omdbapi.com/?apikey=...&s=batman`) before touching any code. This confirmed the key itself was invalid/unactivated — not a bug in the app.