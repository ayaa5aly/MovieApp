export type Movie = {
  id: string;
  title: string;
  year: string;
  rating: string; // e.g. "8.4" — "—" when OMDb has no rating
  genre: string;
  poster?: string;
};
