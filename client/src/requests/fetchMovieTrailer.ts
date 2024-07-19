const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchMovieTrailers = async (movieTitle: string) => {
  const response = await fetch(
    `${BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(
      movieTitle + " trailer"
    )}&key=${API_KEY}`
  );
  const data = await response.json();
  console.log(data.items[0])
  return data.items[0];
};
