import { Link } from "react-router-dom";

import type { Movie } from "@/types/movie";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <article>
      <Card className="overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="aspect-2/3 w-full object-cover"
        />

        <CardHeader>
          <CardTitle>
            {movie.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {movie.releaseDate ? movie.releaseDate.slice(0, 4) : "TBA"}
            </span>

            <span>
              {movie.rating.toFixed(1)} / 10
            </span>
          </div>

          <p className="mb-4 text-sm text-muted-foreground">
            {movie.synopsis}
          </p>

          <Link
            to={`/movies/${movie.id}`}
            className="
              text-sm
              font-medium
              text-blue-600
              hover:underline
            "
          >
            View details
          </Link>
        </CardContent>
      </Card>
    </article>
  );
};

export default MovieCard;
