import { useQuery } from "@tanstack/react-query";

import {
  getMovieDetails,
  getPopularMovies,
} from "@/services/tmdb-service";

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["movies", "popular"],
    queryFn: getPopularMovies,
  });
};

export const useMovieDetails = (movieId: string | undefined) => {
  return useQuery({
    queryKey: ["movies", movieId],
    queryFn: () => getMovieDetails(movieId!),
    enabled: Boolean(movieId),
  });
};
