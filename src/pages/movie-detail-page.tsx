import { Link, useParams } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMovieDetails } from "@/hooks/use-movies";

export function MovieDetailPage() {
  const { movieId } = useParams();
  const { data: movie, isError, isLoading } = useMovieDetails(movieId);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="grid gap-8 py-10 md:grid-cols-[320px_1fr]">
          <Skeleton className="aspect-2/3 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-28 w-full" />
          </div>
        </div>
      </PageContainer>
    );
  }

  if (isError || !movie) {
    return (
      <PageContainer>
        <div className="py-10">
          <p className="text-sm text-destructive">
            We could not load this movie from TMDB.
          </p>

          <Link
            to="/movies"
            className="mt-4 inline-flex text-sm font-medium text-blue-600 hover:underline"
          >
            Back to movies
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <article className="grid gap-8 py-10 md:grid-cols-[320px_1fr]">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="aspect-2/3 w-full rounded-lg object-cover"
        />

        <div>
          <Link
            to="/movies"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Back to movies
          </Link>

          <h1 className="mt-4 text-4xl font-bold">
            {movie.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>

          <dl className="mt-6 grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
            <div>
              <dt className="font-medium text-foreground">Release</dt>
              <dd>{movie.releaseDate || "TBA"}</dd>
            </div>

            <div>
              <dt className="font-medium text-foreground">Rating</dt>
              <dd>{movie.rating.toFixed(1)} / 10</dd>
            </div>

            <div>
              <dt className="font-medium text-foreground">Runtime</dt>
              <dd>{movie.runtime ? `${movie.runtime} min` : "TBA"}</dd>
            </div>
          </dl>

          <p className="mt-8 max-w-3xl text-muted-foreground">
            {movie.synopsis}
          </p>

          <Button asChild size="lg" className="mt-8">
            <Link to={`/movies/${movie.id}/checkout`}>
              Comprar por $4.99
            </Link>
          </Button>
        </div>
      </article>
    </PageContainer>
  );
}
