export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  synopsis: string;
  releaseDate: string;
  rating: number;
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  genres: string[];
}
