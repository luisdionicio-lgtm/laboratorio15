import { Skeleton } from "@/components/ui/skeleton";
import { usePopularMovies } from "@/hooks/use-movies";

import MovieCard from "./movie-card";

interface Props {
  description?: string;
  limit?: number;
  searchTerm?: string;
  title?: string;
}

const MoviesGrid = ({
  description = "Most popular releases right now.",
  limit,
  searchTerm = "",
  title = "Featured Movies",
}: Props) => {
  const { data: movies, isError, isLoading } = usePopularMovies();
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredMovies = movies
    ?.filter((movie) => movie.title.toLowerCase().includes(normalizedSearch))
    .slice(0, limit);

  return (
    <section className="py-4">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">
          {title}
        </h2>

        <p className="mt-2 text-muted-foreground">
          {description}
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
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="font-medium">No movies found</p>

          <p className="mt-2 text-sm text-muted-foreground">
            Try another title from the current TMDB popular list.
          </p>
        </div>
      )}
    </section>
  );
};

export default MoviesGrid;
