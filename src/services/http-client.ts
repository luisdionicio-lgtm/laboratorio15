import axios from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const tmdbClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL ?? "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});
