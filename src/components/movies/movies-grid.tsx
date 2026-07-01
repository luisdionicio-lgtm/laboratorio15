import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { usePopularMovies } from "@/hooks/use-movies";
import { useMoviesFilterStore } from "@/store/movies-filter-store";

import MovieCard from "./movie-card";

const MoviesGrid = () => {
  const { data: movies, isError, isLoading } = usePopularMovies();
  const searchQuery = useMoviesFilterStore((state) => state.searchQuery);
  const setSearchQuery = useMoviesFilterStore((state) => state.setSearchQuery);

  const filteredMovies = movies?.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  return (
    <section className="py-4">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">
          Featured Movies
        </h2>

        <p className="mt-2 text-muted-foreground">
          Most popular releases right now.
        </p>

        <Input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search movies by title..."
          className="mt-4 h-10 max-w-sm"
        />
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

      {filteredMovies && filteredMovies.length > 0 && (
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}

      {filteredMovies && filteredMovies.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No movies match "{searchQuery}".
        </p>
      )}
    </section>
  );
};

export default MoviesGrid;
