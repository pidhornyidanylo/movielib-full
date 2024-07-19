const BACK_URL = import.meta.env.VITE_BACK_URL;

export const listFavouriteMoviesRequest = async (): Promise<
  { success: string; favourites: string[] } | undefined
> => {
  const email = localStorage.getItem("user") as string;
  try {
    const response = await fetch(`${BACK_URL}/api/favourites/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok!");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
