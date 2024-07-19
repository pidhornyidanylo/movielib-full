import type { Request, Response } from "express";
import { favouritesSchema } from "../models/favourites.model";
import type {
  FavouritesRequestBody,
  FavoutitesResponseSuccess,
} from "../types/favourites.dto";
import type { ResponseError } from "../types/index.dto";

export const listFavouriteMovies = async (
  req: Request,
  res: Response<FavoutitesResponseSuccess | ResponseError>
) => {
  const { email } = req.body;
  try {
    const favMoviesExistsInDB = await favouritesSchema.findOne({
      email: email,
    });
    if (!favMoviesExistsInDB) {
      const newFavMoviesUserInstance = new favouritesSchema({
        email: email,
        favourites: [],
      });
      await newFavMoviesUserInstance.save();
      res.status(200).json({
        success: "New favourites instance has been created!",
        favourites: [],
      });
    }
    if (favMoviesExistsInDB) {
      res.status(200).json({
        success: "Favourite movies list fetched successfully",
        favourites: favMoviesExistsInDB.favourites,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const addMovieToFavourites = async (
  req: Request<{}, {}, FavouritesRequestBody>,
  res: Response<FavoutitesResponseSuccess | ResponseError>
) => {
  const { movieId, email } = req.body;
  try {
    const favMoviesExistsInDB = await favouritesSchema.findOne({
      email: email,
    });
    if (favMoviesExistsInDB) {
      await favMoviesExistsInDB.updateOne({
        favourites: Array.from(
          new Set([...favMoviesExistsInDB.favourites, movieId])
        ),
      });
      res.status(200).json({
        success: "Successfully added movie to favourites!",
        favourites: [...favMoviesExistsInDB.favourites, movieId],
      });
    }
    if (!favMoviesExistsInDB) {
      const newCreatedFavList = new favouritesSchema({
        email: email,
        favourites: [movieId],
      });
      await newCreatedFavList.save();
      res.status(200).json({
        success: "Successfully added first movie to favourites!",
        favourites: newCreatedFavList.favourites,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const deleteMovieFromFavourites = async (
  req: Request<{}, {}, FavouritesRequestBody>,
  res: Response<FavoutitesResponseSuccess | ResponseError>
) => {
  const { movieId, email } = req.body;
  try {
    const favMoviesExistsInDB = await favouritesSchema.findOne({
      email: email,
    });
    if (favMoviesExistsInDB) {
      const newFavourites = favMoviesExistsInDB.favourites.filter(
        (movieIdentifier: string) => movieIdentifier !== movieId
      );
      await favMoviesExistsInDB.updateOne({
        favourites: newFavourites,
      });
      res.status(200).json({
        success: "Successfully deleted movie from DB!",
        favourites: newFavourites,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};
