import { beforeEach, describe, expect, it, vi } from "vitest";

import { tmdbClient } from "@/services/http-client";
import { getMovieDetails, getPopularMovies } from "@/services/tmdb-service";

vi.mock("@/services/http-client", () => ({
  tmdbClient: {
    get: vi.fn(),
  },
}));

const mockedTmdbGet = vi.mocked(tmdbClient.get);

describe("tmdb-service", () => {
  beforeEach(() => {
    mockedTmdbGet.mockReset();
  });

  it("maps popular TMDB movies to app movies", async () => {
    mockedTmdbGet.mockResolvedValueOnce({
      data: {
        results: [
          {
            id: 10,
            title: "Disclosure Day",
            overview: "A TMDB movie.",
            poster_path: "/poster.jpg",
            backdrop_path: "/backdrop.jpg",
            release_date: "2026-06-19",
            vote_average: 7.4,
          },
        ],
      },
    });

    await expect(getPopularMovies()).resolves.toEqual([
      {
        id: "10",
        title: "Disclosure Day",
        posterUrl: "https://image.tmdb.org/t/p/w500/poster.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/w1280/backdrop.jpg",
        synopsis: "A TMDB movie.",
        releaseDate: "2026-06-19",
        rating: 7.4,
      },
    ]);
  });

  it("maps movie details with genres and runtime", async () => {
    mockedTmdbGet.mockResolvedValueOnce({
      data: {
        id: 20,
        title: "Interstellar",
        overview: "Space story.",
        poster_path: null,
        backdrop_path: null,
        release_date: "2014-11-07",
        vote_average: 8.4,
        runtime: 169,
        genres: [{ id: 1, name: "Science Fiction" }],
      },
    });

    await expect(getMovieDetails("20")).resolves.toMatchObject({
      id: "20",
      title: "Interstellar",
      genres: ["Science Fiction"],
      runtime: 169,
    });
  });
});
