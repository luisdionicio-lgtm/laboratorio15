import type { Movie } from "@/types/movie";

export const movies: Movie[] = [
  {
    id: "1",
    title: "Interstellar",
    posterUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    backdropUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    synopsis: "A journey beyond the stars.",
    releaseDate: "2014-11-07",
    rating: 8.4,
  },
  {
    id: "2",
    title: "Dune",
    posterUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
    backdropUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
    synopsis: "The future of Arrakis.",
    releaseDate: "2021-10-22",
    rating: 7.8,
  },
  {
    id: "3",
    title: "Oppenheimer",
    posterUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    synopsis: "The story behind the atomic age.",
    releaseDate: "2023-07-21",
    rating: 8.1,
  },
];
