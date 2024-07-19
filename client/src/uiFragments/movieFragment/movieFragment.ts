import { addMovieToFavouritesRequest } from "../../pages/favourites/module/addToFavouritesRequest";
import { deleteMovieFromFavourites } from "../../pages/favourites/module/deleteMovieFromFavourites";
import Toastify from "toastify-js";
import "./movieFragment.scss";
import type { Movie } from "../../types.dto";

export const appendMoviesToContainer = <
  S extends string,
  T extends HTMLElement | Element
>(
  moviesHtml: S,
  container: T
): void => {
  container.innerHTML += moviesHtml;
};

export const generateMovieHtml = <
  M extends Movie,
  T extends "home" | "favourites",
  B extends boolean
>(
  movies: M[],
  type: T,
  isAuthenticated?: B
) => {
  return movies
    .map(
      (movie) =>
        `
        <div class="movie-card">
          	<div class="image-container">
            <img loading="lazy" onload="this.classList.add('loaded')" height="400px" width="250px" src="https://image.tmdb.org/t/p/original${
              movie.poster_path
            }" alt="${movie.title}" />
          	</div>
        	<div class="movie-title"><a href="/movie/${
            movie.id
          }" class="single-movie-link">${movie.title}</a></div>
          	${
              type === "home" && isAuthenticated
                ? `<button data-movie=${movie.id} class="addBtn">Watch later</button>`
                : ""
            }
            ${
              type === "favourites"
                ? `<button data-movie=${movie.id} class="deleteBtn">Delete</button>`
                : ""
            }
        </div>
      `
    )
    .join("");
};

export const addMovieEventListeners = (): void => {
  const addButtons = document.querySelectorAll(".addBtn");
  for (const button of addButtons) {
    button.addEventListener("click", (event: Event) => {
      event.preventDefault();
      const movieID = (event.target as HTMLButtonElement).dataset.movie;
      if (movieID) {
        addMovieToFavouritesRequest(movieID);
        Toastify({
          text: "Movie successfully added to favorites!",
          className: "info-toast",
          gravity: "bottom",
          position: "right",
          style: {
            background: "#a2c3e0",
          },
        }).showToast();
      }
    });
  }
  const deleteButtons = document.querySelectorAll(".deleteBtn");
  for (const button of deleteButtons) {
    button.addEventListener("click", (event: Event) => {
      event.preventDefault();
      const movieID = (event.target as HTMLButtonElement).dataset.movie;
      if (movieID) {
        deleteMovieFromFavourites(movieID);
        Toastify({
          text: "Movie successfully removed from favorites!",
          className: "info-toast",
          gravity: "bottom",
          position: "right",
          style: {
            background: "#a2c3e0",
          },
        }).showToast();
      }
    });
  }
};
