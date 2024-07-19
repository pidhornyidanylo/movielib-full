import { fetchMovies } from "../../../requests/fetchMoviesByPage";
import { fetchSearchedMovie } from "../../../requests/fetchSearcedMovieByTitle";
import type { Movie } from "../../../types.dto";
import {
  hideLoader,
  showLoader,
} from "../../../uiFragments/loaderFragment/loader";
import {
  addMovieEventListeners,
  appendMoviesToContainer,
  generateMovieHtml,
} from "../../../uiFragments/movieFragment/movieFragment";
import { renderSearch } from "../../../uiFragments/searchFrament/searchFragment";
import { updateMain } from "../../../uiUpdaters";
import { debounce, type DebouncedFunction } from "../../../utils/debounce";

let currentPage = 1;
let isFetching = false;

export const homeHandler = async <T extends HTMLElement, B extends boolean>(
  container: T,
  isAuthenticated: B
) => {
  container.innerHTML = `
        <h3 class="home-title">vanilla-js <span>movie</span> library.</h3>
        <div id="search-container"></div>
        <div id="movies-container"></div>
        <div id="loader" class="loader"></div>
    `;
  const search = document.getElementById("search-container");
  search && renderSearch(search);

  const movies = await fetchMovies(1);
  const moviesHtml = generateMovieHtml(
    movies as Movie[],
    "home",
    isAuthenticated
  );

  const moviesContainer = document.getElementById("movies-container");
  if (moviesContainer) {
    if (!localStorage.getItem("inSearchMode")) {
      appendMoviesToContainer(moviesHtml, moviesContainer);
      addMovieEventListeners();
      fetchMoreMoviesAfterWindowScroll(isAuthenticated);
    } else {
      localStorage.setItem(
        "inSearchMode",
        localStorage.getItem("inSearchMode") as string
      );
      const movies = await fetchSearchedMovie(
        localStorage.getItem("inSearchMode") as string
      );
      const moviesHtml = generateMovieHtml(movies as Movie[], "home", isAuthenticated);
      appendMoviesToContainer(moviesHtml, moviesContainer);
    }
  }

  const singleMovieLinks = document.querySelectorAll(".single-movie-link");
  if (singleMovieLinks) {
    for (const link of singleMovieLinks) {
      link.addEventListener("click", async (event: Event) => {
        event.preventDefault();
        history.pushState({}, "", (event.target as HTMLLinkElement).href);
        await updateMain();
      });
    }
  }
};

export const handleScroll = <B extends boolean>(isAuthenticated: B):  DebouncedFunction<() => Promise<void>> =>
  debounce(
    async () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 720 &&
        !isFetching &&
        !localStorage.getItem("inSearchMode")
      ) {
        isFetching = true;
        window.innerWidth > 768 && showLoader();
        currentPage++;

        const movies = await fetchMovies(currentPage);
        const moviesHtml = generateMovieHtml(movies as Movie[], "home", isAuthenticated);

        const container = document.querySelector("#movies-container");
        if (container) {
          container.innerHTML += moviesHtml;
          addMovieEventListeners();
        }
        isFetching = false;
        hideLoader();
      }
    },
    1000,
    { maxWait: 2000 }
  );

const fetchMoreMoviesAfterWindowScroll = <B extends boolean>(isAuthenticated: B): void => {
  if (window.location.pathname === "/") {
    window.addEventListener("scroll", handleScroll(isAuthenticated));
  }
};
