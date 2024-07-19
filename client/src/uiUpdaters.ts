import { loginHandler } from "./pages/(auth)/login/modules/loginHandler";
import { registerHandler } from "./pages/(auth)/register/modules/registerHandler";
import { favouritesHandler } from "./pages/favourites/module/favouritesHandler";
import { homeHandler } from "./pages/home/module/homeHandler";
import { handleMovie } from "./pages/movie/module/movieHandler";
import { type Auth, checkAuth } from "./requests/checkAuth";
import { handleMain } from "./uiFragments/mainFragment/mainFragment";
import { handleNavBar, setActiveLink } from "./uiFragments/navigationFragment/navigationFragment";
import { clearStorage } from "./uiFragments/searchFrament/searchFragment";

export const updateNavBar = async (): Promise<void> => {
  const auth = await checkAuth();
  const header = document.querySelector<HTMLElement>("#header");
  if (header) {
    handleNavBar(header, (auth as Auth).authenticated);
  }
};

export const updateMain = async (): Promise<void> => {
  const auth = await checkAuth();
  const main = document.querySelector<HTMLElement>("#main");
  if (main) {
    handleMain(main, (auth as Auth).authenticated);
  }
  setActiveLink();
  updateLogin();
  updateRegister();
  await updateHome((auth as Auth).authenticated);
  updateMovie();
  updateFavourites();
};

export const updateLogin = (): void => {
  const loginContainer =
    document.querySelector<HTMLDivElement>("#login-container");
  if (loginContainer) {
    loginHandler(loginContainer);
  }
};

export const updateRegister = (): void => {
  const registerContainer = document.querySelector<HTMLDivElement>(
    "#register-container"
  );
  if (registerContainer) {
    registerHandler(registerContainer);
  }
};

export const updateHome = async (isAuthenticated: boolean): Promise<void> => {
  const homeContainer =
    document.querySelector<HTMLDivElement>("#home-container");
  if (homeContainer) {
    await homeHandler(homeContainer, isAuthenticated);
  }
};

export const updateMovie = (): void => {
  const movieContainer =
    document.querySelector<HTMLDivElement>("#movie-container");
  if (movieContainer) {
    handleMovie(movieContainer);
    clearStorage();
  }
};

export const updateFavourites = (): void => {
  const favouritesContainer = document.querySelector<HTMLDivElement>(
    "#favourites-container"
  );
  if (favouritesContainer) {
    favouritesHandler(favouritesContainer);
  }
};
