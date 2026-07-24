import type { Movie } from "./types";

const OMDB_BASE_URL = "https://www.omdbapi.com/";

export type OmdbErrorCode =
  | "MISSING_API_KEY"
  | "API_ERROR"
  | "NOT_FOUND"
  | "NETWORK_ERROR";

export class OmdbError extends Error {
  readonly code: OmdbErrorCode;

  constructor(message: string, code: OmdbErrorCode) {
    super(message);
    this.name = "OmdbError";
    this.code = code;
  }
}

export type OmdbSearchResult = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type OmdbSearchResponse = {
  Search?: OmdbSearchResult[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
};

export type OmdbMovieDetail = {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  Response: "True" | "False";
  Error?: string;
};

type OmdbResponse = {
  Response: "True" | "False";
  Error?: string;
};

function getApiKey(): string {
  const key = process.env.OMDB_API_KEY?.trim();
  if (!key) {
    throw new OmdbError(
      "OMDB_API_KEY is not configured. Add it to .env.local or Vercel env vars.",
      "MISSING_API_KEY",
    );
  }
  return key;
}

function parseOmdbError(message: string): OmdbError {
  const lower = message.toLowerCase();

  if (
    lower.includes("not found") ||
    lower.includes("incorrect imdb id") ||
    lower.includes("too many results")
  ) {
    return new OmdbError(message, "NOT_FOUND");
  }

  if (
    lower.includes("invalid api key") ||
    lower.includes("request limit") ||
    lower.includes("daily limit") ||
    lower.includes("401")
  ) {
    return new OmdbError(message, "API_ERROR");
  }

  return new OmdbError(message, "API_ERROR");
}

async function fetchOmdb<T extends OmdbResponse>(
  params: Record<string, string>,
): Promise<T> {
  const url = new URL(OMDB_BASE_URL);
  url.searchParams.set("apikey", getApiKey());

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  let response: Response;

  try {
    response = await fetch(url.toString(), { cache: "no-store" });
  } catch {
    throw new OmdbError("Failed to reach OMDb. Check your network connection.", "NETWORK_ERROR");
  }

  if (!response.ok) {
    throw new OmdbError(`OMDb request failed (${response.status})`, "API_ERROR");
  }

  const data = (await response.json()) as T;

  if (data.Response === "False") {
    throw parseOmdbError(data.Error ?? "Unknown OMDb error");
  }

  return data;
}

/** Search movies by title via OMDb `s=` parameter. Returns an empty array for blank queries. */
export async function searchMovies(query: string): Promise<OmdbSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const data = await fetchOmdb<OmdbSearchResponse>({
    s: trimmed,
    type: "movie",
  });

  return data.Search ?? [];
}

/** Fetch full movie details via OMDb `i=` (IMDb ID) parameter. */
export async function getMovieById(imdbId: string): Promise<OmdbMovieDetail> {
  return fetchOmdb<OmdbMovieDetail>({
    i: imdbId,
    plot: "full",
  });
}

/** Map an OMDb search hit to the app's shared Movie shape (used by cards/lists). */
export function omdbSearchResultToMovie(result: OmdbSearchResult): Movie {
  return {
    id: result.imdbID,
    title: result.Title,
    year: result.Year,
    rating: "—",
    genre: result.Type,
    poster: result.Poster !== "N/A" ? result.Poster : undefined,
  };
}

/** Map full OMDb detail payload to the app's shared Movie shape. */
export function omdbDetailToMovie(detail: OmdbMovieDetail): Movie {
  return {
    id: detail.imdbID,
    title: detail.Title,
    year: detail.Year,
    rating: detail.imdbRating !== "N/A" ? detail.imdbRating : "—",
    genre: detail.Genre,
    poster: detail.Poster !== "N/A" ? detail.Poster : undefined,
  };
}
