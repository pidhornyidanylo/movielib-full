import { fetchFavouriteMoviesByID } from "../../../requests/fetchFavouriteMoviesByID";
import {
  addMovieEventListeners,
  appendMoviesToContainer,
  generateMovieHtml,
} from "../../../uiFragments/movieFragment/movieFragment";
import { listFavouriteMoviesRequest } from "./listFavouriteMoviesRequest";
import { type Auth, checkAuth } from "../../../requests/checkAuth";
import "../favourites.scss";
import type { Movie } from "../../../types.dto";

export const favouritesHandler = async <T extends HTMLElement>(
  container: T
): Promise<void> => {
  const auth = await checkAuth();
  container.innerHTML = `
    <h3 class="favourites-title">your favourite <span>movies</span> list.</h3>
    <div id="favourite-movies-container"></div>
  `;
  const movieIDs = await listFavouriteMoviesRequest();
  const movies = await fetchFavouriteMoviesByID(
    (movieIDs as { success: string; favourites: string[] }).favourites
  );
  const moviesHtml = generateMovieHtml(
    movies as Movie[],
    "favourites",
    (auth as Auth).authenticated
  );
  const favouriteMoviesContainer = document.querySelector(
    "#favourite-movies-container"
  );
  if (favouriteMoviesContainer) {
    appendMoviesToContainer(moviesHtml, favouriteMoviesContainer);
    addMovieEventListeners();
  }
};
