import mongoose from "mongoose";
import type { FavouritesMovieModel } from "../types/models.dto";

const favMovieSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	favourites: {
		type: Array,
		required: true,
	},
});

export const favouritesSchema = mongoose.model<FavouritesMovieModel>(
	"fav_movies",
	favMovieSchema,
);
