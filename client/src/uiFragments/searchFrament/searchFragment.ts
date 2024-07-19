import { type Auth, checkAuth } from "../../requests/checkAuth";
import { fetchSearchedMovie } from "../../requests/fetchSearcedMovieByTitle";
import type { Movie } from "../../types.dto";
import { updateMain } from "../../uiUpdaters";
import {
  appendMoviesToContainer,
  generateMovieHtml,
} from "../movieFragment/movieFragment";
import "./searchFrament.scss";

export const renderSearch = <T extends HTMLElement>(container: T): void => {
  container.innerHTML += `
        <form id="search-form">
            <input class="search-input" placeolder="search for a movie" />
            <button id="search-btn" type="submit">Search</button>
            <button id="back-btn">Back</button>
        </form>
    `;

  const form = document.getElementById("search-form");
    form?.addEventListener("submit", async (event: Event) => {
      event.preventDefault();
      const input = document.querySelector(".search-input") as HTMLInputElement;
      if (input && input.value.length > 0) {
        const moviesContainer = document.querySelector("#movies-container");
        const auth = await checkAuth();
        const movies = await fetchSearchedMovie(input.value);
        if (moviesContainer) moviesContainer.innerHTML = "";
        localStorage.setItem("inSearchMode", input.value);
        const moviesHtml = generateMovieHtml(
          movies as Movie[],
          "home",
          (auth as Auth).authenticated
        );
        const searchedMovieSpan = document.createElement("span");
        searchedMovieSpan.innerHTML = `${localStorage.getItem("inSearchMode")}`
        searchedMovieSpan.className = "searched-span"
        form.appendChild(searchedMovieSpan);
        if (moviesContainer && localStorage.getItem("inSearchMode")) {
          appendMoviesToContainer(moviesHtml, moviesContainer);
          input.value = "";
        }
      }
    });
    
  const backBtn = document.querySelector("#back-btn");
    backBtn?.addEventListener("click", async (event: Event): Promise<void> => {
      event.preventDefault();
      clearStorage();
      await updateMain();
    });
};

export const clearStorage = (): void => {
  localStorage.removeItem("inSearchMode");
};
