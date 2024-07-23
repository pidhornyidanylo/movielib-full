import type { Movie } from "../types.dto";
import { AUTH_TOKEN } from "./fetchSearcedMovieByTitle";

const URI = "https://api.themoviedb.org/3/trending/movie/day";

export const fetchMovies = async <T extends number>(
  page: T
): Promise<
Movie[] | undefined
> => {
  try {
    const response = await fetch(`${URI}?page=${page}`, {
      headers: {
        Authorization: AUTH_TOKEN,
        accept: "application/json",
      },
    });
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error fetching movies", error);
  }
};
