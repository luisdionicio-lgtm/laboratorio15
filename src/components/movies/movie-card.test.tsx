import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import MovieCard from "@/components/movies/movie-card";
import { mockMovies } from "@/test/mock-movies";
import { renderWithProviders } from "@/test/test-utils";

describe("MovieCard", () => {
  it("renders movie information and detail links", () => {
    renderWithProviders(<MovieCard movie={mockMovies[0]} />);

    expect(screen.getByText("Disclosure Day")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
    expect(screen.getByText("7.4 / 10")).toBeInTheDocument();
    expect(screen.getByText(/secrets arriving/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /disclosure day|view details/i })).toHaveLength(2);
  });
});
