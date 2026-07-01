import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/layouts/main-layout";

import { CheckoutPage } from "@/pages/checkout-page";
import HomePage from "@/pages/home-page";
import { MovieDetailPage } from "@/pages/movie-detail-page";
import { MoviesPage } from "@/pages/movies-page";
import { MyMoviesPage } from "@/pages/my-movies-page";
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
        path: "/movies/:movieId/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/my-movies",
        element: <MyMoviesPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
