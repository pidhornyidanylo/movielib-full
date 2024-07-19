import { Router } from "express";
import {
	addMovieToFavourites,
	deleteMovieFromFavourites,
	listFavouriteMovies,
} from "../handlers/favourites.handlers";

const router = Router();

router.post("/list", listFavouriteMovies);
router.post("/add", addMovieToFavourites);
router.post("/delete", deleteMovieFromFavourites);

export default router;
