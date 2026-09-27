const API = "/api/tmdb";

const FALLBACK_IMAGE =
  "https://placehold.co/500x750/0b1524/f5f8ff?text=No+Poster";

const movieGrid = document.getElementById("movieGrid");
const ottGrid = document.getElementById("ottGrid");
const seriesGrid = document.getElementById("seriesGrid");
const upcomingGrid = document.getElementById("upcomingGrid");
const newsList = document.getElementById("newsList");
const trendingList = document.getElementById("trendingList");

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("mainNav");

const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("searchBar");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

const toast = document.getElementById("toast");


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

    return await response.json();
  } catch (error) {
    console.error("TMDB Error:", error);

    showToast("Unable to load movie data");

    return {
      results: []
    };
  }
}


/* =========================
   HELPERS
========================= */

function imageUrl(path, size = "w500") {
  if (!path) return FALLBACK_IMAGE;

  return `https://image.tmdb.org/t/p/${size}${path}`;
}


function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function formatDate(date) {
  if (!date) return "Release date unavailable";

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


function rating(value) {
  if (!value || Number(value) === 0) {
    return "—";
  }

  return Number(value).toFixed(1);
}


function titleOf(item) {
  return item.title || item.name || item.original_title || item.original_name || "Untitled";
}


function dateOf(item) {
  return item.release_date || item.first_air_date || "";
}


function typeOf(item) {
  if (item.media_type === "tv" || item.first_air_date) {
    return "Series";
  }

  return "Movie";
}


/* =========================
   MOVIE CARD
========================= */

function movieCard(item, badge = "") {
  const title = titleOf(item);
  const date = dateOf(item);
  const score = rating(item.vote_average);
  const poster = imageUrl(item.poster_path);

  return `
    <article
      class="movie-card searchable"
      data-title="${escapeHTML(title)}"
    >
      <div
        class="poster real-poster"
        style="background-image:
          linear-gradient(180deg, transparent 35%, rgba(0,0,0,.85) 100%),
          url('${poster}')"
      >

        ${
          badge
            ? `<span class="badge">${escapeHTML(badge)}</span>`
            : ""
        }

        <span class="rating">
          ${score !== "—" ? `⭐ ${score}` : "N/A"}
        </span>

        <span class="poster-title">
          ${escapeHTML(title)}
        </span>
      </div>

      <div class="card-meta">
        <h3>${escapeHTML(title)}</h3>

        <p>
          ${date ? formatDate(date) : "Coming Soon"}
          ·
          <span class="star">
            ${score !== "—" ? `★ ${score}` : "No Rating"}
          </span>
        </p>
      </div>
    </article>
  `;
}


/* =========================
   RENDER GRID
========================= */

function renderGrid(element, results, badge = "") {
  if (!element) return;

  if (!results || results.length === 0) {
    element.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:30px;
        text-align:center;
        color:#91a1b8;
      ">
        No titles available right now.
      </div>
    `;

    return;
  }

  element.innerHTML = results
    .slice(0, 8)
    .map(item => movieCard(item, badge))
    .join("");
}


/* =========================
   TRENDING
========================= */

function renderTrending(results) {
  if (!trendingList) return;

  const items = results
    .filter(item => item.poster_path)
    .slice(0, 5);

  trendingList.innerHTML = items
    .map((item, index) => {
      const title = titleOf(item);

      return `
        <div class="trend">
          <span class="trend-num">${index + 1}</span>

          <span
            class="mini-poster"
            style="
              background-image:
              linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2)),
              url('${imageUrl(item.poster_path, "w185")}')
            "
          ></span>

          <span>
            <b>${escapeHTML(title)}</b>

            <small>
              ${typeOf(item)}
              · ⭐ ${rating(item.vote_average)}
            </small>
          </span>
        </div>
      `;
    })
    .join("");
}


/* =========================
   NEWS
========================= */

function renderNews() {
  if (!newsList) return;

  newsList.innerHTML = `
    <article class="news-item">
      <div class="news-thumb">TMDB</div>

      <div>
        <span>FILMYRADAR</span>
        <h3>Latest movies and shows are updated automatically</h3>
        <p>
          FilmyRadarIndia now fetches live movie and TV information
          from TMDB.
        </p>
      </div>
    </article>

    <article class="news-item">
      <div class="news-thumb">OTT</div>

      <div>
        <span>OTT GUIDE</span>
        <h3>Discover popular movies available on streaming platforms</h3>
        <p>
          Explore popular titles and OTT availability through
          dynamically fetched data.
        </p>
      </div>
    </article>

    <article class="news-item">
      <div class="news-thumb">TRENDING</div>

      <div>
        <span>NOW TRENDING</span>
        <h3>See what's trending right now</h3>
        <p>
          Trending titles are automatically refreshed from TMDB.
        </p>
      </div>
    </article>
  `;
}


/* =========================
   HERO
========================= */

function updateHero(item) {
  if (!item) return;

  const heroTitle = document.querySelector(".hero h1");
  const heroSubtitle = document.querySelector(".hero h2");
  const heroText = document.querySelector(".hero p");
  const heroPoster = document.querySelector(".hero-poster");
  const heroPill = document.querySelector(".hero .pill");

  const title = titleOf(item);

  if (heroTitle) {
    heroTitle.innerHTML = escapeHTML(title);
  }

  if (heroSubtitle) {
    heroSubtitle.textContent =
      item.overview
        ? item.overview.slice(0, 100) + "..."
        : "Discover what's trending right now.";
  }

  if (heroText) {
    heroText.textContent =
      item.overview ||
      "Discover the latest movies, OTT releases, web series and entertainment updates.";
  }

  if (heroPill) {
    heroPill.textContent = "🔥 TRENDING NOW";
  }

  if (heroPoster && item.poster_path) {
    heroPoster.style.backgroundImage =
      `linear-gradient(180deg,transparent 25%,rgba(0,0,0,.9)),url('${imageUrl(item.poster_path, "w500")}')`;

    heroPoster.style.backgroundSize = "cover";
    heroPoster.style.backgroundPosition = "center";
    heroPoster.style.padding = "0";
  }

  if (heroPoster) {
    heroPoster.innerHTML = `
      <div style="
        position:absolute;
        left:15px;
        right:15px;
        bottom:18px;
        z-index:2;
        text-shadow:0 2px 8px #000;
      ">
        <div style="
          font-size:11px;
          font-weight:800;
          color:#ffc52e;
          margin-bottom:5px;
        ">
          TRENDING
        </div>

        <strong style="
          display:block;
          font-size:22px;
          line-height:1.05;
          color:white;
        ">
          ${escapeHTML(title)}
        </strong>
      </div>
    `;
  }
}


/* =========================
   LOAD HOMEPAGE
========================= */

async function loadHomepage() {
  movieGrid.innerHTML = `<div class="loading">Loading movies...</div>`;
  ottGrid.innerHTML = `<div class="loading">Loading OTT titles...</div>`;
  seriesGrid.innerHTML = `<div class="loading">Loading series...</div>`;
  upcomingGrid.innerHTML = `<div class="loading">Loading upcoming releases...</div>`;

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

  renderGrid(
    movieGrid,
    movies.results,
    "MOVIE"
  );

  renderGrid(
    ottGrid,
    ott.results,
    "OTT"
  );

  renderGrid(
    seriesGrid,
    series.results,
    "SERIES"
  );

  renderGrid(
    upcomingGrid,
    upcoming.results,
    "UPCOMING"
  );

  renderTrending(trending.results || []);

  renderNews();

  updateHero(
    (trending.results || []).find(
      item => item.poster_path
    )
  );
}


/* =========================
   SEARCH
========================= */

async function performSearch(query) {
  if (!query.trim()) {
    loadHomepage();
    return;
  }

  movieGrid.innerHTML = `
    <div style="
      grid-column:1/-1;
      padding:30px;
      text-align:center;
      color:#91a1b8;
    ">
      Searching...
    </div>
  `;

  const data = await getData("search", query);

  const results = (data.results || [])
    .filter(item =>
      item.media_type === "movie" ||
      item.media_type === "tv"
    )
    .filter(item => item.poster_path);

  renderGrid(
    movieGrid,
    results,
    "SEARCH"
  );

  document.querySelector("#movies")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
}


searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  clearTimeout(window.searchTimer);

  window.searchTimer = setTimeout(() => {
    if (query.length >= 2) {
      performSearch(query);
    }
  }, 500);
});


clearSearch.onclick = () => {
  searchInput.value = "";
  loadHomepage();
};


searchBtn.onclick = () => {
  searchBar.classList.toggle("open");

  if (searchBar.classList.contains("open")) {
    searchInput.focus();
  }
};


/* =========================
   MENU
========================= */

menuBtn.onclick = () => {
  nav.classList.toggle("open");
};


document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});


/* =========================
   SUBSCRIBE
========================= */

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


const subscribeForm =
  document.getElementById("subscribeForm");


if (subscribeForm) {
  subscribeForm.addEventListener("submit", event => {
    event.preventDefault();

    showToast(
      "Thanks! You're subscribed to FilmyRadarIndia."
    );

    subscribeForm.reset();

    const msg =
      document.getElementById("subscribeMsg");

    if (msg) {
      msg.textContent =
        "Subscription received ✓";
    }
  });
}


/* =========================
   CATEGORY SEARCH
========================= */

document.querySelectorAll(".tags button")
  .forEach(button => {

    button.addEventListener("click", () => {

      searchBar.classList.add("open");

      searchInput.value =
        button.textContent.trim();

      performSearch(
        button.textContent.trim()
      );
    });

  });


/* =========================
   START
========================= */

loadHomepage();
