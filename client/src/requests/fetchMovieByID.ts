import type { Movie } from "../types.dto";
import { AUTH_TOKEN } from "./fetchSearcedMovieByTitle";

export const fetchMovieById = async <S extends string>(
  id: S
): Promise<Movie | undefined> => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        Authorization: AUTH_TOKEN,
        accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching movie by ID", error);
  }
};
