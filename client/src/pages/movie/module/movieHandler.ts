import { fetchMovieById } from "../../../requests/fetchMovieByID";
import { fetchMovieTrailers } from "../../../requests/fetchMovieTrailer";
import "../movie.scss";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const handleMovie = async <T extends HTMLElement>(
  container: T
): Promise<void> => {
  const movie = await fetchMovieById(window.location.pathname.slice(7));
  if (movie) {
    container.innerHTML = `
            <div class="backdrop-container">
                <div class="backdrop-overlay"></div>
                    <img src="https://image.tmdb.org/t/p/original${
                      movie.backdrop_path
                    }" alt="backdrop" />
                </div>
                <div class="movie-content-container">
                    <div class="movie-poster">
                    <img src="https://image.tmdb.org/t/p/original${
                      movie.poster_path
                    }" alt="poster" />
                    <span class="vote">${movie.vote_average.toFixed(1)}</span>
                </div>
            <div class="movie-info">
                    <h4 class="movie-title-single">${movie.title}</h4>
                    <p class="tag-line">${movie.tagline}</p>
                    <hr/>
                    <p class="movie-overview">${movie.overview}</p>
                    <ul class="info-list">
                        <li class="adult">Adult: ${
                          movie.adult ? "18+" : "12+"
                        }</li>
                        <li class="original-country">Country: ${
                          movie.origin_country
                        }</li>
                        <li class="original-language">Language: ${
                          movie.original_language[0].toUpperCase() +
                          movie.original_language.slice(1)
                        }</li>
                        <li class="budget">Budget: ${
                          movie.budget > 0
                            ? USDollar.format(movie.budget)
                            : USDollar.format(234900070)
                        }</li>
                        <li class="genres">Genres: ${movie.genres
                          .map(
                            (genre: { id: number; name: string }) => genre.name
                          )
                          .join(", ")}</li>
                        <li class="runtime">Runtime: ${
                          movie.runtime > 0 ? movie.runtime : 120
                        } min</li>
                    </ul>
              </div>
            </div>
            <div id="trailers"></div>
        `;
  }
  const trailer = async function displayTrailers(movieTitle: string) {
    const trailer = await fetchMovieTrailers(movieTitle);
    const trailerContainer = document.getElementById("trailers");
    if (trailerContainer) {
      trailerContainer.innerHTML = "";
      const iframe = document.createElement("iframe");
      iframe.className = "movie-trailer"
      iframe.src = `https://www.youtube.com/embed/${trailer.id.videoId}`;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      trailerContainer.appendChild(iframe);
    }
  };
  trailer(movie?.title as string);
};
