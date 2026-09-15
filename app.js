let movies = [];

async function loadMovies() {
  const response = await fetch("movies.json");
  movies = await response.json();

  displayMovies(movies);
  displayStats(movies);
}

function displayMovies(moviesToDisplay) {
  const container = document.querySelector("#movies");

  container.innerHTML = moviesToDisplay
    .map(movie => `
      <article class="movie-card">
        <div class="movie-rating">
          ⭐ ${movie.rating}
        </div>

        <h3>${movie.title}</h3>

        <p class="movie-info">
          ${movie.year} · ${movie.genre}
        </p>

        <p class="movie-director">
          ${movie.director}
        </p>
      </article>
    `)
    .join("");

    
  document.querySelector("#movie-result").textContent =
    `${moviesToDisplay.length} film${moviesToDisplay.length > 1 ? "s" : ""}`;
}

function displayStats(moviesToDisplay) {
  const count = moviesToDisplay.length;

  const totalRating = moviesToDisplay.reduce(
    (sum, movie) => sum + movie.rating,
    0
  );

  const averageRating = totalRating / count;

}

loadMovies();