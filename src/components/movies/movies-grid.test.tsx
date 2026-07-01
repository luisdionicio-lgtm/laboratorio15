import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import MoviesGrid from "@/components/movies/movies-grid";
import { usePopularMovies } from "@/hooks/use-movies";
import { mockMovies } from "@/test/mock-movies";
import { renderWithProviders } from "@/test/test-utils";

vi.mock("@/hooks/use-movies", () => ({
  usePopularMovies: vi.fn(),
}));

const mockedUsePopularMovies = vi.mocked(usePopularMovies);

describe("MoviesGrid", () => {
  beforeEach(() => {
    mockedUsePopularMovies.mockReturnValue({
      data: mockMovies,
      isError: false,
      isLoading: false,
    } as ReturnType<typeof usePopularMovies>);
  });

  it("renders movies returned by the hook", () => {
    renderWithProviders(<MoviesGrid title="Popular Movies" />);

    expect(screen.getByRole("heading", { name: "Popular Movies" })).toBeInTheDocument();
    expect(screen.getByText("Disclosure Day")).toBeInTheDocument();
    expect(screen.getByText("Interstellar")).toBeInTheDocument();
  });

  it("filters movies by search term", () => {
    renderWithProviders(<MoviesGrid searchTerm="inter" />);

    expect(screen.getByText("Interstellar")).toBeInTheDocument();
    expect(screen.queryByText("Disclosure Day")).not.toBeInTheDocument();
  });

  it("shows an empty state when there are no matches", () => {
    renderWithProviders(<MoviesGrid searchTerm="missing title" />);

    expect(screen.getByText("No movies found")).toBeInTheDocument();
  });
});
