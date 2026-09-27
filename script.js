const API = "/api/tmdb";

const FALLBACK_IMAGE =
  "https://placehold.co/500x750/0b1524/f5f8ff?text=No+Poster";

/* =========================
   DOM
========================= */

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
   TOAST
========================= */

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


/* =========================
   API
========================= */

async function getData(action, query = "") {
  try {
    let url = `${API}?action=${encodeURIComponent(action)}`;

    if (query) {
      url += `&query=${encodeURIComponent(query)}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);
      throw new Error(data.error || `API Error ${response.status}`);
    }

    return data;

  } catch (error) {
    console.error(`TMDB ${action} error:`, error);

    return {
      results: [],
      error: error.message
    };
  }
}


/* =========================
   HELPERS
========================= */

function imageUrl(path, size = "w500") {
  if (!path) {
    return FALLBACK_IMAGE;
  }

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


function titleOf(item) {
  return (
    item.title ||
    item.name ||
    item.original_title ||
    item.original_name ||
    "Untitled"
  );
}


function dateOf(item) {
  return item.release_date || item.first_air_date || "";
}


function formatDate(date) {
  if (!date) {
    return "Release date unavailable";
  }

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


function isTV(item) {
  return (
    item.media_type === "tv" ||
    Boolean(item.first_air_date) ||
    Boolean(item.name)
  );
}


function typeOf(item) {
  return isTV(item) ? "Series" : "Movie";
}


/* =========================
   LOADING
========================= */

function loadingHTML(text) {
  return `
    <div style="
      grid-column:1/-1;
      padding:40px 20px;
      text-align:center;
      color:#91a1b8;
      font-size:13px;
    ">
      ${escapeHTML(text)}
    </div>
  `;
}


/* =========================
   MOVIE CARD
========================= */

function movieCard(item, badge = "") {
  const title = titleOf(item);
  const date = dateOf(item);
  const score = rating(item.vote_average);
  const poster = imageUrl(item.poster_path);

  const safeTitle = escapeHTML(title);
  const safeDate = escapeHTML(date);

  return `
    <article
      class="movie-card searchable"
      data-title="${safeTitle}"
    >

      <div
        class="poster real-poster"
        style="
          background-image:
          linear-gradient(
            180deg,
            rgba(0,0,0,0.02) 20%,
            rgba(0,0,0,0.88) 100%
          ),
          url('${poster}');
          background-size:cover;
          background-position:center;
        "
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
          ${safeTitle}
        </span>

      </div>

      <div class="card-meta">

        <h3>${safeTitle}</h3>

        <p>
          ${
            safeDate
              ? formatDate(date)
              : "Coming Soon"
          }

          ·

          <span class="star">
            ${
              score !== "—"
                ? `★ ${score}`
                : "No Rating"
            }
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

  if (!Array.isArray(results) || results.length === 0) {

    element.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:35px 20px;
        text-align:center;
        color:#91a1b8;
      ">
        No titles available right now.
      </div>
    `;

    return;
  }

  const validResults = results
    .filter(item => item && item.poster_path)
    .slice(0, 8);

  if (validResults.length === 0) {

    element.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:35px 20px;
        text-align:center;
        color:#91a1b8;
      ">
        No posters available right now.
      </div>
    `;

    return;
  }

  element.innerHTML = validResults
    .map(item => movieCard(item, badge))
    .join("");
}


/* =========================
   TRENDING
========================= */

function renderTrending(results) {
  if (!trendingList) return;

  const items = (results || [])
    .filter(item => item && item.poster_path)
    .slice(0, 5);

  if (!items.length) {
    trendingList.innerHTML = `
      <div style="
        padding:20px 0;
        color:#91a1b8;
        font-size:12px;
      ">
        Trending data unavailable.
      </div>
    `;

    return;
  }

  trendingList.innerHTML = items
    .map((item, index) => {

      const title = titleOf(item);

      return `
        <div class="trend">

          <span class="trend-num">
            ${index + 1}
          </span>

          <span
            class="mini-poster"
            style="
              background-image:
              linear-gradient(
                rgba(0,0,0,.15),
                rgba(0,0,0,.3)
              ),
              url('${imageUrl(item.poster_path, "w185")}');
              background-size:cover;
              background-position:center;
            "
          ></span>

          <span>

            <b>
              ${escapeHTML(title)}
            </b>

            <small>
              ${typeOf(item)}
              ·
              ⭐ ${rating(item.vote_average)}
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

      <div class="news-thumb">
        TMDB
      </div>

      <div>

        <span>
          FILMYRADAR
        </span>

        <h3>
          Live movie & series updates
        </h3>

        <p>
          FilmyRadarIndia automatically updates
          movie and TV information from TMDB.
        </p>

      </div>

    </article>


    <article class="news-item">

      <div class="news-thumb">
        OTT
      </div>

      <div>

        <span>
          OTT GUIDE
        </span>

        <h3>
          Discover popular movies and shows
        </h3>

        <p>
          Explore popular titles and discover
          what's trending right now.
        </p>

      </div>

    </article>


    <article class="news-item">

      <div class="news-thumb">
        🔥
      </div>

      <div>

        <span>
          TRENDING
        </span>

        <h3>
          What's trending right now?
        </h3>

        <p>
          Trending movies and series are refreshed
          automatically from TMDB.
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

  const heroTitle =
    document.querySelector(".hero h1");

  const heroSubtitle =
    document.querySelector(".hero h2");

  const heroText =
    document.querySelector(".hero p");

  const heroPoster =
    document.querySelector(".hero-poster");

  const heroPill =
    document.querySelector(".hero .pill");

  const title = titleOf(item);


  /* TITLE */

  if (heroTitle) {
    heroTitle.innerHTML =
      escapeHTML(title);
  }


  /* SUBTITLE */

  if (heroSubtitle) {

    const overview =
      item.overview || "";

    heroSubtitle.textContent =
      overview
        ? overview.length > 110
          ? overview.substring(0, 110) + "..."
          : overview
        : "Trending right now on FilmyRadarIndia";
  }


  /* DESCRIPTION */

  if (heroText) {

    heroText.textContent =
      item.overview ||
      "Discover the latest movies, OTT releases, web series, reviews and entertainment updates.";
  }


  /* BADGE */

  if (heroPill) {
    heroPill.textContent =
      isTV(item)
        ? "🔥 TRENDING SERIES"
        : "🔥 TRENDING MOVIE";
  }


  /* HERO POSTER */

  if (heroPoster && item.poster_path) {

    heroPoster.style.backgroundImage = `
      linear-gradient(
        180deg,
        transparent 20%,
        rgba(0,0,0,.92) 100%
      ),
      url('${imageUrl(item.poster_path, "w500")}')
    `;

    heroPoster.style.backgroundSize =
      "cover";

    heroPoster.style.backgroundPosition =
      "center";

    heroPoster.style.padding = "0";


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
          font-size:10px;
          font-weight:800;
          color:#ffc52e;
          margin-bottom:5px;
        ">
          ${isTV(item) ? "SERIES" : "MOVIE"}
        </div>

        <strong style="
          display:block;
          font-size:21px;
          line-height:1.08;
          color:white;
        ">
          ${escapeHTML(title)}
        </strong>

        <div style="
          margin-top:6px;
          font-size:11px;
          color:#d5deea;
        ">
          ⭐ ${rating(item.vote_average)}
        </div>

      </div>

    `;
  }
}


/* =========================
   LOAD HOMEPAGE
========================= */

async function loadHomepage() {

  if (movieGrid) {
    movieGrid.innerHTML =
      loadingHTML("Loading latest movies...");
  }

  if (ottGrid) {
    ottGrid.innerHTML =
      loadingHTML("Loading OTT titles...");
  }

  if (seriesGrid) {
    seriesGrid.innerHTML =
      loadingHTML("Loading web series...");
  }

  if (upcomingGrid) {
    upcomingGrid.innerHTML =
      loadingHTML("Loading upcoming releases...");
  }


  /*
    API requests separately.
    If one fails, other sections
    will still load.
  */

  const trendingPromise =
    getData("trending");

  const moviesPromise =
    getData("movies");

  const ottPromise =
    getData("ott");

  const seriesPromise =
    getData("tv");

  const upcomingPromise =
    getData("upcoming");


  const [
    trending,
    movies,
    ott,
    series,
    upcoming
  ] = await Promise.all([
    trendingPromise,
    moviesPromise,
    ottPromise,
    seriesPromise,
    upcomingPromise
  ]);


  /* MOVIES */

  renderGrid(
    movieGrid,
    movies.results || [],
    "MOVIE"
  );


  /* OTT */

  renderGrid(
    ottGrid,
    ott.results || [],
    "OTT"
  );


  /* SERIES */

  renderGrid(
    seriesGrid,
    series.results || [],
    "SERIES"
  );


  /* UPCOMING */

  renderGrid(
    upcomingGrid,
    upcoming.results || [],
    "UPCOMING"
  );


  /* TRENDING */

  renderTrending(
    trending.results || []
  );


  /* NEWS */

  renderNews();


  /* HERO */

  const heroItem =
    (trending.results || [])
      .find(item => item.poster_path);

  updateHero(heroItem);


  /*
    If every API request failed,
    show a useful message.
  */

  const allEmpty =
    !(movies.results || []).length &&
    !(ott.results || []).length &&
    !(series.results || []).length &&
    !(upcoming.results || []).length;


  if (allEmpty) {

    showToast(
      "Movie data could not be loaded. Please refresh."
    );

  }

}


/* =========================
   SEARCH
========================= */

async function performSearch(query) {

  const cleanQuery =
    query.trim();

  if (!cleanQuery) {
    loadHomepage();
    return;
  }


  if (movieGrid) {

    movieGrid.innerHTML =
      loadingHTML(
        `Searching for "${cleanQuery}"...`
      );

  }


  const data =
    await getData(
      "search",
      cleanQuery
    );


  const results =
    (data.results || [])
      .filter(item =>
        item.media_type === "movie" ||
        item.media_type === "tv"
      )
      .filter(item =>
        item.poster_path
      );


  renderGrid(
    movieGrid,
    results,
    "SEARCH"
  );


  const moviesSection =
    document.querySelector("#movies");


  if (moviesSection) {

    moviesSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }


  if (!results.length) {

    showToast(
      `No results found for "${cleanQuery}"`
    );

  }

}


/* =========================
   SEARCH INPUT
========================= */

if (searchInput) {

  searchInput.addEventListener(
    "input",
    () => {

      const query =
        searchInput.value.trim();

      clearTimeout(
        window.searchTimer
      );


      if (query.length < 2) {
        return;
      }


      window.searchTimer =
        setTimeout(() => {

          performSearch(query);

        }, 500);

    }
  );

}


/* =========================
   CLEAR SEARCH
========================= */

if (clearSearch) {

  clearSearch.onclick = () => {

    searchInput.value = "";

    loadHomepage();

  };

}


/* =========================
   SEARCH BUTTON
========================= */

if (searchBtn) {

  searchBtn.onclick = () => {

    searchBar.classList.toggle(
      "open"
    );


    if (
      searchBar.classList.contains("open")
    ) {

      searchInput.focus();

    }

  };

}


/* =========================
   MOBILE MENU
========================= */

if (menuBtn && nav) {

  menuBtn.onclick = () => {

    nav.classList.toggle(
      "open"
    );

  };

}


document
  .querySelectorAll("#mainNav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        if (nav) {
          nav.classList.remove(
            "open"
          );
        }

      }
    );

  });


/* =========================
   SUBSCRIBE
========================= */

const subscribeForm =
  document.getElementById(
    "subscribeForm"
  );


if (subscribeForm) {

  subscribeForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      showToast(
        "Thanks! You're subscribed to FilmyRadarIndia."
      );


      subscribeForm.reset();


      const msg =
        document.getElementById(
          "subscribeMsg"
        );


      if (msg) {

        msg.textContent =
          "Subscription received ✓";

      }

    }
  );

}


/* =========================
   CATEGORY SEARCH
========================= */

document
  .querySelectorAll(".tags button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const category =
          button.textContent.trim();


        if (searchBar) {
          searchBar.classList.add(
            "open"
          );
        }


        if (searchInput) {
          searchInput.value =
            category;
        }


        performSearch(
          category
        );

      }
    );

  });


/* =========================
   START WEBSITE
========================= */

loadHomepage();
