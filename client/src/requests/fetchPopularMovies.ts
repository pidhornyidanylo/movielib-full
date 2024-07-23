import type { Movie } from "../types.dto";
import { AUTH_TOKEN } from "./fetchSearcedMovieByTitle";

export const fetchPopularMovies = async (): Promise<Movie[] | undefined> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
      {
        headers: {
          Authorization: AUTH_TOKEN,
          accept: "application/json",
        },
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error fetching movies", error);
  }
};
