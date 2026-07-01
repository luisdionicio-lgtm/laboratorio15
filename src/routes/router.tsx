import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/layouts/main-layout";

import HomePage from "@/pages/home-page";
import { MovieDetailPage } from "@/pages/movie-detail-page";
import { MoviesPage } from "@/pages/movies-page";
import { NotFoundPage } from "@/pages/not-found-page";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movies",
        element: <MoviesPage />,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
