import type { Movie } from "../types.dto";

export const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

export const fetchSearchedMovie = async <S extends string>(
  movie: S
): Promise<
Movie[] | undefined
> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        movie
      )}`,
      {
        headers: {
          Authorization: AUTH_TOKEN,
          accept: "application/json",
        },
      }
    );
    const data = await response.json();
    return data.results
      .slice(0, 16)
      .filter(
        (movie: {
          poster_path: string;
          title: string;
          id: number;
          backdrop_path: string;
        }) => movie.title && movie.backdrop_path && movie.poster_path
      );
  } catch (error) {
    console.log("Error fetching searched movie", error);
  }
};
