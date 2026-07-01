import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Movie } from "@/types/movie";

interface PurchasesState {
  purchasedMovies: Movie[];
  purchaseMovie: (movie: Movie) => void;
  isMoviePurchased: (movieId: string) => boolean;
}

export const usePurchasesStore = create<PurchasesState>()(
  persist(
    (set, get) => ({
      purchasedMovies: [],
      purchaseMovie: (movie) => {
        const already = get().purchasedMovies.some((m) => m.id === movie.id);
        if (!already) {
          set((state) => ({
            purchasedMovies: [...state.purchasedMovies, movie],
          }));
        }
      },
      isMoviePurchased: (movieId) =>
        get().purchasedMovies.some((m) => m.id === movieId),
    }),
    { name: "cinespoilers-purchases" }
  )
);
