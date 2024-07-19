import {
	about,
	favourites,
	home,
	login,
	movie,
	register,
	settings,
} from "./pages/index";

export type Route = {
	linkLabel: string;
	content: string | ((id: string) => string);
};

export const publicRoutes: { [key: string]: Route } = {
	"/": {
		linkLabel: "Home",
		content: home,
	},
	"/about": {
		linkLabel: "About",
		content: about,
	},
	"/settings": {
		linkLabel: "Settings",
		content: settings,
	},
	"/movie/:id": {
		linkLabel: "Movie",
		content: movie,
	},
	"/login": {
		linkLabel: "Login",
		content: login,
	},
	"/register": {
		linkLabel: "Register",
		content: register,
	},
};

export const secureRoutes: { [key: string]: Route } = {
	"/": {
		linkLabel: "Home",
		content: home,
	},
	"/about": {
		linkLabel: "About",
		content: about,
	},
	"/settings": {
		linkLabel: "Settings",
		content: settings,
	},
	"/movie/:id": {
		linkLabel: "Movie",
		content: movie,
	},
	"/favourites": {
		linkLabel: "Favourites",
		content: favourites,
	},
};
