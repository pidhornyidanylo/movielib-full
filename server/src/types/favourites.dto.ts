import type { ResponseSuccess } from "./index.dto";

export type FavouritesRequestBody = {
	movieId: string;
	email: string;
};

export type FavoutitesResponseSuccess = ResponseSuccess & {
	favourites: string[] | [];
};
