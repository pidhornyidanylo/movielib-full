import type { Movie } from "../types.dto";
import { fetchMovieById } from "./fetchMovieByID";

export const fetchFavouriteMoviesByID = async <S extends string>(
  ids: S[]
): Promise<
  Movie[] | undefined
> => {
  const movies: Movie[] = [];
  const fetchPromises = ids.map(async (id) => {
    const movie:
      | Movie
      | undefined = await fetchMovieById(id);
    movies.push(movie as Movie);
  });

  await Promise.all(fetchPromises);
  return movies;
};
