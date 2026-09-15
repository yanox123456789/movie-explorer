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
        ${movie.poster ? `<img class="movie-poster" src="${movie.poster}" alt="Affiche de ${movie.title}">` : ""}
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

        ${movie.description ? `<p class="movie-description">${movie.description}</p>` : ""}
      </article>
    `)
    .join("");

  const result = document.querySelector("#movie-result");
  if (result) {
    result.textContent =
      `${moviesToDisplay.length} film${moviesToDisplay.length > 1 ? "s" : ""}`;
  }
}

function displayStats(moviesToDisplay) {
  const count = moviesToDisplay.length;

  const totalRating = moviesToDisplay.reduce(
    (sum, movie) => sum + movie.rating,
    0
  );

  const averageRating = totalRating / count;

}

function setupSearch() {
  const search = document.querySelector("#search");
  if (!search) {
    return;
  }

  search.addEventListener("input", () => {
    const query = search.value.trim().toLowerCase();
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(query)
    );
    displayMovies(filtered);
  });
}

loadMovies();
setupSearch();
