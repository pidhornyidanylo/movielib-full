import type { Document } from "mongoose";

export type FavouritesMovieModel = Document & {
	email: string;
	favourites: string[];
};

export type AuthUserModel = Document & {
	email: string;
	password: string;
};
