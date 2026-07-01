import { tmdbClient } from "@/services/http-client";
import type { Movie, MovieDetails } from "@/types/movie";

const imageBaseUrl =
  import.meta.env.VITE_TMDB_IMAGE_URL ?? "https://image.tmdb.org/t/p/w500";

interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}

interface TmdbMovieDetails extends TmdbMovie {
  runtime: number | null;
  genres: Array<{
    id: number;
    name: string;
  }>;
}

interface TmdbListResponse {
  results: TmdbMovie[];
}

const buildImageUrl = (path: string | null, size = "w500") => {
  if (!path) {
    return "/favicon.svg";
  }

  const cleanImageBaseUrl = imageBaseUrl.replace(/\/$/, "");
  const hasSizeSegment = /\/(w\d+|original)$/.test(cleanImageBaseUrl);

  if (hasSizeSegment) {
    return `${cleanImageBaseUrl}${path}`;
  }

  return `${cleanImageBaseUrl}/${size}${path}`;
};

const mapMovie = (movie: TmdbMovie): Movie => ({
  id: String(movie.id),
  title: movie.title,
  posterUrl: buildImageUrl(movie.poster_path),
  backdropUrl: buildImageUrl(movie.backdrop_path, "w1280"),
  synopsis: movie.overview || "Synopsis not available.",
  releaseDate: movie.release_date,
  rating: movie.vote_average,
});

const mapMovieDetails = (movie: TmdbMovieDetails): MovieDetails => ({
  ...mapMovie(movie),
  runtime: movie.runtime,
  genres: movie.genres.map((genre) => genre.name),
});

export const getPopularMovies = async () => {
  const response = await tmdbClient.get<TmdbListResponse>("/movie/popular", {
    params: {
      language: "en-US",
      page: 1,
    },
  });

  return response.data.results.map(mapMovie);
};

export const getMovieDetails = async (movieId: string) => {
  const response = await tmdbClient.get<TmdbMovieDetails>(`/movie/${movieId}`, {
    params: {
      language: "en-US",
    },
  });

  return mapMovieDetails(response.data);
};
