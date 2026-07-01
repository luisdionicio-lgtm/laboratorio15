import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { usePopularMovies } from "@/hooks/use-movies";
import { MoviesPage } from "@/pages/movies-page";
import { mockMovies } from "@/test/mock-movies";
import { renderWithProviders } from "@/test/test-utils";

vi.mock("@/hooks/use-movies", () => ({
  usePopularMovies: vi.fn(),
}));

const mockedUsePopularMovies = vi.mocked(usePopularMovies);

describe("MoviesPage", () => {
  it("renders the catalog and filters with the search input", async () => {
    mockedUsePopularMovies.mockReturnValue({
      data: mockMovies,
      isError: false,
      isLoading: false,
    } as ReturnType<typeof usePopularMovies>);

    renderWithProviders(<MoviesPage />);

    expect(screen.getByRole("heading", { name: "Explore Movies" })).toBeInTheDocument();
    expect(screen.getByText("Disclosure Day")).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText("Search popular movies"), "inter");

    expect(screen.getByText("Interstellar")).toBeInTheDocument();
    expect(screen.queryByText("Disclosure Day")).not.toBeInTheDocument();
  });
});
