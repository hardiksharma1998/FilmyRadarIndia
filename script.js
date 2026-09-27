const API = "/api/tmdb";

const FALLBACK_IMAGE =
  "https://placehold.co/500x750/0b1524/f5f8ff?text=No+Poster";

const state = {
  trending: [],
  movies: [],
  ott: [],
  series: [],
  upcoming: [],
  searchResults: []
};

/* =========================
   API
========================= */

async function getData(action, query = "") {
  try {
    let url = `${API}?action=${encodeURIComponent(action)}`;

    if (query) {
      url += `&query=${encodeURIComponent(query)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.results || [];
  } catch (error) {
    console.error(`Failed to load ${action}:`, error);
    return [];
  }
}

/* =========================
   HELPERS
========================= */

function posterUrl(path) {
  if (!path) return FALLBACK_IMAGE;

  return `https://image.tmdb.org/t/p/w500${path}`;
}

function backdropUrl(path) {
  if (!path) return "";

  return `https://image.tmdb.org/t/p/w1280${path}`;
}

function titleOf(item) {
  return (
    item.title ||
    item.name ||
    item.original_title ||
    item.original_name ||
    "Untitled"
  );
}

function releaseDate(item) {
  return (
    item.release_date ||
    item.first_air_date ||
    ""
  );
}

function formatDate(date) {
  if (!date) return "Coming Soon";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return date;
  }

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function ratingOf(item) {
  const rating = Number(item.vote_average || 0);

  return rating > 0 ? rating.toFixed(1) : "N/A";
}

function typeOf(item) {
  if (item.media_type === "tv" || item.first_air_date) {
    return "Series";
  }

  return "Movie";
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================
   MOVIE CARD
========================= */

function movieCard(item) {
  const title = escapeHtml(titleOf(item));
  const rating = ratingOf(item);
  const date = formatDate(releaseDate(item));
  const type = typeOf(item);
  const poster = posterUrl(item.poster_path);

  return `
    <article class="movie-card">
      <div
        class="poster"
        style="
          background-image:
          url('${poster}');
          background-size:cover;
          background-position:center;
        "
      >
        <div class="poster-overlay"></div>

        <div class="poster-content">
          <span class="badge">${type}</span>

          <h3>${title}</h3>

          <div class="meta">
            <span>⭐ ${rating}</span>
            <span>${date}</span>
          </div>
        </div>
      </div>

      <div class="movie-info">
        <h3>${title}</h3>
        <p>
          <span>⭐ ${rating}</span>
          <span>${type}</span>
        </p>
      </div>
    </article>
  `;
}

/* =========================
   GRID RENDER
========================= */

function renderGrid(id, items) {
  const container = document.getElementById(id);

  if (!container) return;

  if (!items || !items.length) {
    container.innerHTML = `
      <div class="empty-state">
        No content available right now.
      </div>
    `;

    return;
  }

  container.innerHTML = items
    .slice(0, 8)
    .map(movieCard)
    .join("");
}

/* =========================
   TRENDING
========================= */

function renderTrending(items) {
  const container = document.getElementById("trendingList");

  if (!container) return;

  if (!items.length) {
    container.innerHTML = `
      <p class="empty-state">
        Trending content unavailable.
      </p>
    `;

    return;
  }

  container.innerHTML = items
    .slice(0, 6)
    .map((item, index) => {
      const title = escapeHtml(titleOf(item));
      const rating = ratingOf(item);
      const poster = posterUrl(item.poster_path);

      return `
        <div class="trending-item">

          <div class="trend-number">
            ${String(index + 1).padStart(2, "0")}
          </div>

          <div
            class="mini-poster"
            style="
              background-image:url('${poster}');
              background-size:cover;
              background-position:center;
            "
          ></div>

          <div class="trend-info">
            <h3>${title}</h3>

            <p>
              ⭐ ${rating}
              · ${typeOf(item)}
            </p>
          </div>

        </div>
      `;
    })
    .join("");
}

/* =========================
   HERO
========================= */

function updateHero(items) {
  const heroTitle = document.querySelector(".hero-copy h1");
  const heroSubtitle = document.querySelector(".hero-copy h2");
  const heroText = document.querySelector(".hero-copy p");
  const heroPoster = document.querySelector(".hero-poster");
  const heroArt = document.querySelector(".hero-art");

  if (!items.length) return;

  const item = items.find(
    x => x.backdrop_path || x.poster_path
  ) || items[0];

  const title = titleOf(item);

  if (heroTitle) {
    heroTitle.innerHTML = `${escapeHtml(title)}`;
  }

  if (heroSubtitle) {
    heroSubtitle.textContent =
      `${typeOf(item)} • ⭐ ${ratingOf(item)}`;
  }

  if (heroText) {
    heroText.textContent =
      "Discover the latest movies, web series, OTT releases and trending entertainment on FilmyRadarIndia.";
  }

  if (heroPoster && item.poster_path) {
    heroPoster.style.backgroundImage =
      `url('${posterUrl(item.poster_path)}')`;

    heroPoster.style.backgroundSize = "cover";
    heroPoster.style.backgroundPosition = "center";

    heroPoster.querySelectorAll("*").forEach(el => {
      el.style.position = "relative";
      el.style.zIndex = "2";
    });
  }

  if (heroArt && item.backdrop_path) {
    heroArt.style.backgroundImage =
      `linear-gradient(rgba(5,9,19,.2),rgba(5,9,19,.75)),url('${backdropUrl(item.backdrop_path)}')`;

    heroArt.style.backgroundSize = "cover";
    heroArt.style.backgroundPosition = "center";
  }
}

/* =========================
   NEWS
========================= */

function renderNews(items) {
  const container = document.getElementById("newsList");

  if (!container) return;

  const newsItems = items.slice(0, 5);

  if (!newsItems.length) {
    container.innerHTML = `
      <div class="empty-state">
        No latest updates available.
      </div>
    `;

    return;
  }

  container.innerHTML = newsItems
    .map(item => {
      const title = escapeHtml(titleOf(item));
      const poster = posterUrl(item.poster_path);
      const date = formatDate(releaseDate(item));

      return `
        <article class="news-item">

          <div
            class="news-thumb"
            style="
              background-image:url('${poster}');
              background-size:cover;
              background-position:center;
            "
          ></div>

          <div class="news-content">
            <span class="news-tag">
              ${typeOf(item)}
            </span>

            <h3>${title}</h3>

            <p>
              ⭐ ${ratingOf(item)}
              · ${date}
            </p>
          </div>

        </article>
      `;
    })
    .join("");
}

/* =========================
   LOADING
========================= */

function showLoading(ids) {
  ids.forEach(id => {
    const container = document.getElementById(id);

    if (!container) return;

    container.innerHTML = `
      <div class="loading-state">
        <span>Loading...</span>
      </div>
    `;
  });
}

/* =========================
   HOMEPAGE
========================= */

async function loadHomepage() {
  console.log("FilmyRadarIndia dynamic homepage loading...");

  showLoading([
    "movieGrid",
    "ottGrid",
    "seriesGrid",
    "upcomingGrid",
    "trendingList",
    "newsList"
  ]);

  const [
    trending,
    movies,
    ott,
    series,
    upcoming
  ] = await Promise.all([
    getData("trending"),
    getData("movies"),
    getData("ott"),
    getData("tv"),
    getData("upcoming")
  ]);

  state.trending = trending;
  state.movies = movies;
  state.ott = ott;
  state.series = series;
  state.upcoming = upcoming;

  console.log("Trending:", trending);
  console.log("Movies:", movies);
  console.log("OTT:", ott);
  console.log("Series:", series);
  console.log("Upcoming:", upcoming);

  renderGrid("movieGrid", movies);
  renderGrid("ottGrid", ott);
  renderGrid("seriesGrid", series);
  renderGrid("upcomingGrid", upcoming);

  renderTrending(trending);

  renderNews([
    ...movies,
    ...series,
    ...upcoming
  ]);

  updateHero(trending);

  console.log("FilmyRadarIndia loaded successfully 🔥");
}

/* =========================
   SEARCH
========================= */

async function performSearch(query) {
  const value = query.trim();

  if (!value) {
    loadHomepage();
    return;
  }

  const results = await getData("search", value);

  state.searchResults = results;

  const movieGrid = document.getElementById("movieGrid");
  const ottGrid = document.getElementById("ottGrid");
  const seriesGrid = document.getElementById("seriesGrid");
  const upcomingGrid = document.getElementById("upcomingGrid");

  if (movieGrid) {
    movieGrid.innerHTML = results.length
      ? results.slice(0, 8).map(movieCard).join("")
      : `<div class="empty-state">No results found.</div>`;
  }

  if (ottGrid) {
    ottGrid.innerHTML = "";
  }

  if (seriesGrid) {
    seriesGrid.innerHTML = "";
  }

  if (upcomingGrid) {
    upcomingGrid.innerHTML = "";
  }

  const movieSection = document.getElementById("movies");

  if (movieSection) {
    movieSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  const heading = document.querySelector("#movies .section-head h2");

  if (heading) {
    heading.textContent = `🔎 Search Results for "${value}"`;
  }
}

/* =========================
   SEARCH UI
========================= */

function setupSearch() {
  const searchBtn = document.getElementById("searchBtn");
  const searchBar = document.getElementById("searchBar");
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");

  if (searchBtn && searchBar) {
    searchBtn.addEventListener("click", () => {
      searchBar.classList.toggle("open");

      if (searchBar.classList.contains("open") && searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    });
  }

  if (searchInput) {
    let timer;

    searchInput.addEventListener("input", () => {
      clearTimeout(timer);

      const query = searchInput.value.trim();

      if (!query) {
        loadHomepage();
        return;
      }

      timer = setTimeout(() => {
        performSearch(query);
      }, 500);
    });

    searchInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        performSearch(searchInput.value);
      }
    });
  }

  if (clearSearch) {
    clearSearch.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
      }

      loadHomepage();
    });
  }
}

/* =========================
   MOBILE MENU
========================= */

function setupMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("mainNav");

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

/* =========================
   SUBSCRIBE
========================= */

function setupSubscribe() {
  const form = document.getElementById("subscribeForm");
  const message = document.getElementById("subscribeMsg");

  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const input = form.querySelector("input");

    if (!input || !input.value) return;

    if (message) {
      message.textContent =
        "Thanks! You're subscribed to FilmyRadarIndia.";
    }

    input.value = "";

    showToast("Subscribed successfully 🔥");
  });
}

/* =========================
   TOAST
========================= */

function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* =========================
   CATEGORY BUTTONS
========================= */

function setupCategories() {
  const buttons = document.querySelectorAll(".tags button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.textContent.trim();

      const searchInput =
        document.getElementById("searchInput");

      const searchBar =
        document.getElementById("searchBar");

      if (searchInput) {
        searchInput.value = value;
      }

      if (searchBar) {
        searchBar.classList.add("open");
      }

      performSearch(value);
    });
  });
}

/* =========================
   IMAGE FALLBACK
========================= */

function setupImageFallbacks() {
  document.addEventListener("error", event => {
    const element = event.target;

    if (
      element.tagName === "IMG" &&
      !element.dataset.fallback
    ) {
      element.dataset.fallback = "true";
      element.src = FALLBACK_IMAGE;
    }
  }, true);
}

/* =========================
   VIEW ALL BUTTONS
========================= */

function setupViewAll() {
  document.querySelectorAll(".section-head a").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      showToast("More content coming soon 🎬");
    });
  });
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  console.log("FilmyRadarIndia JS started 🔥");

  setupSearch();
  setupMobileMenu();
  setupSubscribe();
  setupCategories();
  setupImageFallbacks();
  setupViewAll();

  loadHomepage();
});
