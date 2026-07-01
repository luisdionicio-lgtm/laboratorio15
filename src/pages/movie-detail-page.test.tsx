import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { useMovieDetails } from "@/hooks/use-movies";
import { MovieDetailPage } from "@/pages/movie-detail-page";
import { mockMovieDetails } from "@/test/mock-movies";

vi.mock("@/hooks/use-movies", () => ({
  useMovieDetails: vi.fn(),
}));

const mockedUseMovieDetails = vi.mocked(useMovieDetails);

describe("MovieDetailPage", () => {
  it("renders movie details from TMDB data", () => {
    mockedUseMovieDetails.mockReturnValue({
      data: mockMovieDetails,
      isError: false,
      isLoading: false,
    } as ReturnType<typeof useMovieDetails>);

    render(
      <MemoryRouter initialEntries={["/movies/2"]}>
        <Routes>
          <Route path="/movies/:movieId" element={<MovieDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Interstellar" })).toBeInTheDocument();
    expect(screen.getByText("Science Fiction")).toBeInTheDocument();
    expect(screen.getByText("169 min")).toBeInTheDocument();
    expect(screen.getByText(/wormhole in space/i)).toBeInTheDocument();
    expect(mockedUseMovieDetails).toHaveBeenCalledWith("2");
  });
});
