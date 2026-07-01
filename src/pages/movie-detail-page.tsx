import { CalendarDays, Clock, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
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
    <>
      <section
        className="border-b bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(255 255 255 / 96%), rgb(255 255 255 / 82%)), url(${movie.backdropUrl})`,
        }}
      >
        <PageContainer>
          <div className="py-10">
            <Link
              to="/movies"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Back to movies
            </Link>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold md:text-5xl">
              {movie.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <article className="grid gap-8 py-10 md:grid-cols-[320px_1fr]">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="aspect-2/3 w-full rounded-lg object-cover"
          />

          <div>
            <dl className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
              <div className="rounded-lg border p-4">
                <dt className="flex items-center gap-2 font-medium text-foreground">
                  <CalendarDays className="h-4 w-4 text-blue-600" />
                  Release
                </dt>
                <dd className="mt-2">{movie.releaseDate || "TBA"}</dd>
              </div>

              <div className="rounded-lg border p-4">
                <dt className="flex items-center gap-2 font-medium text-foreground">
                  <Star className="h-4 w-4 text-blue-600" />
                  Rating
                </dt>
                <dd className="mt-2">{movie.rating.toFixed(1)} / 10</dd>
              </div>

              <div className="rounded-lg border p-4">
                <dt className="flex items-center gap-2 font-medium text-foreground">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Runtime
                </dt>
                <dd className="mt-2">
                  {movie.runtime ? `${movie.runtime} min` : "TBA"}
                </dd>
              </div>
            </dl>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold">Synopsis</h2>

              <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
                {movie.synopsis}
              </p>
            </section>
          </div>
        </article>
      </PageContainer>
    </>
  );
}
