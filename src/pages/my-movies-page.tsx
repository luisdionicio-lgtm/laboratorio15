import { Play, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { usePurchasesStore } from "@/store/purchases-store";

export function MyMoviesPage() {
  const { purchasedMovies } = usePurchasesStore();

  return (
    <PageContainer>
      <div className="py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mis Películas</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {purchasedMovies.length === 0
                ? "Tu biblioteca está vacía"
                : `${purchasedMovies.length} película${purchasedMovies.length !== 1 ? "s" : ""} en tu biblioteca`}
            </p>
          </div>

          {purchasedMovies.length > 0 && (
            <div className="flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              <ShoppingBag className="h-3.5 w-3.5" />
              {purchasedMovies.length} comprada{purchasedMovies.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {purchasedMovies.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-dashed py-24 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="rounded-full border-2 border-dashed border-muted-foreground/30 p-8">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/40" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold text-lg">No tienes películas aún</p>
              <p className="text-sm text-muted-foreground mt-1">Explora el catálogo y agrega tu primera película</p>
            </div>
            <Button asChild size="lg">
              <Link to="/movies">Explorar películas</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {purchasedMovies.map((movie, i) => (
              <Link
                key={movie.id}
                to={`/movies/${movie.id}`}
                className="group relative block rounded-xl overflow-hidden border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 hover:border-border animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
              >
                {/* Poster */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/30 transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 fill-white text-white ml-0.5" />
                    </div>
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-[11px] font-semibold text-white">{movie.rating.toFixed(1)}</span>
                  </div>

                  {/* Purchased badge */}
                  <div className="absolute top-2 left-2 rounded-full bg-blue-600/90 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                    COMPRADA
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="font-semibold text-sm leading-tight line-clamp-2">{movie.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {movie.releaseDate?.slice(0, 4) || "TBA"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
