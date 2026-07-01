import { Skeleton } from "@/components/ui/skeleton";
import { usePopularMovies } from "@/hooks/use-movies";

import MovieCard from "./movie-card";

const MoviesGrid = () => {
  const { data: movies, isError, isLoading } = usePopularMovies();

  return (
    <section className="py-4">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">
          Featured Movies
        </h2>

        <p className="mt-2 text-muted-foreground">
          Most popular releases right now.
        </p>
      </header>

      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className="aspect-2/3 w-full"
            />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-sm text-destructive">
          We could not load movies from TMDB right now.
        </p>
      )}

      {movies && (
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MoviesGrid;
