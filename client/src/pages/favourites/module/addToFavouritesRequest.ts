const BACK_URL: string = import.meta.env.VITE_BACK_URL;
import type { Movie } from "../../../types.dto";
import { updateFavourites } from "../../../uiUpdaters";

export const addMovieToFavouritesRequest = async (movieId: string): Promise<Movie | undefined> => {
  const email = localStorage.getItem("user") as string;
  try {
    const response = await fetch(`${BACK_URL}/api/favourites/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId, email }),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok!");
    }
    const data = await response.json();
    updateFavourites();
    return data;
  } catch (error: unknown) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
