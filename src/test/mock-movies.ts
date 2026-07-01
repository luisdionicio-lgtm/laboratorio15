import type { Movie, MovieDetails } from "@/types/movie";

export const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Disclosure Day",
    posterUrl: "https://image.tmdb.org/t/p/w500/disclosure.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/disclosure.jpg",
    synopsis: "A thriller about secrets arriving at the cinema.",
    releaseDate: "2026-06-19",
    rating: 7.4,
  },
  {
    id: "2",
    title: "Interstellar",
    posterUrl: "https://image.tmdb.org/t/p/w500/interstellar.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/interstellar.jpg",
    synopsis: "Explorers travel through a wormhole in space.",
    releaseDate: "2014-11-07",
    rating: 8.4,
  },
];

export const mockMovieDetails: MovieDetails = {
  ...mockMovies[1],
  genres: ["Science Fiction", "Drama"],
  runtime: 169,
};
