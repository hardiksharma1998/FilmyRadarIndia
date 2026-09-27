/*
  FILMYRADARINDIA
  Upgraded frontend script
  Replace your existing script.js with this file.
*/

/* =========================================================
   DATA
========================================================= */

const movies = [
  {
    title: "UNABOMBER",
    tag: "Netflix",
    category: "Hollywood",
    genre: "Crime Drama",
    language: "English",
    date: "Sep 2026",
    rating: "—",
    image:
      "https://occ-0-7977-2774.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZaqthoMMZj-YgtRmNNSg4nqtB4gVOyFb47vITtrSTvFTPI6m2pWg2kmHgtpoX2PRxi30jBRHiC2ecphoka7YJE6LRVEGkexIUTB.jpg?r=5f2",
    description:
      "A crime drama title available to explore through FilmyRadarIndia.",
    trailer: "#"
  },

  {
    title: "The Love Hypothesis",
    tag: "Prime Video",
    category: "Hollywood",
    genre: "Romance",
    language: "English",
    date: "23 Sep 2026",
    rating: "—",
    image: "",
    description:
      "A romantic title featured in the latest OTT and entertainment lineup.",
    trailer: "#"
  },

  {
    title: "Don't Be Shy",
    tag: "Prime Video",
    category: "Bollywood",
    genre: "Drama",
    language: "Hindi",
    date: "25 Sep 2026",
    rating: "—",
    image: "",
    description:
      "A new Hindi title featured in the FilmyRadarIndia release guide.",
    trailer: "#"
  },

  {
    title: "Toxic: A Fairy Tale for Grown-Ups",
    tag: "ZEE5",
    category: "South",
    genre: "Action Drama",
    language: "Kannada",
    date: "25 Sep 2026",
    rating: "—",
    image: "",
    description:
      "A South Indian title featured in the FilmyRadarIndia movie radar.",
    trailer: "#"
  }
];


const ott = [
  {
    title: "Shaque: Trust No One",
    tag: "Netflix",
    category: "Web Series",
    genre: "Mystery Thriller",
    language: "Hindi",
    date: "24 Sep 2026",
    rating: "—",
    image:
      "https://occ-0-7977-2774.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZaqthoMMZj-YgtRmNNSg4nqtB4gVOyFb47vITtrSTvFTPI6m2pWg2kmHgtpoX2PRxi30jBRHiC2ecphoka7YJE6LRVEGkexIUTB.jpg?r=5f2",
    description:
      "A mystery thriller highlighted in the latest OTT releases.",
    trailer: "#"
  },

  {
    title: "Hunkkaar: The Roar",
    tag: "JioHotstar",
    category: "Hindi",
    genre: "Crime Thriller",
    language: "Hindi",
    date: "25 Sep 2026",
    rating: "—",
    image: "",
    description:
      "A crime thriller included in this week's OTT watchlist.",
    trailer: "#"
  },

  {
    title: "Don't Be Shy",
    tag: "Prime Video",
    category: "Hindi",
    genre: "Drama",
    language: "Hindi",
    date: "25 Sep 2026",
    rating: "—",
    image: "",
    description:
      "A Hindi title included in the latest Prime Video releases.",
    trailer: "#"
  },

  {
    title: "Mango Pachcha",
    tag: "JioHotstar",
    category: "Kannada",
    genre: "Drama",
    language: "Kannada",
    date: "25 Sep 2026",
    rating: "8.8",
    image: "",
    description:
      "A Kannada title included in the latest OTT lineup.",
    trailer: "#"
  },

  {
    title: "The Love Hypothesis",
    tag: "Prime Video",
    category: "English",
    genre: "Romance",
    language: "English",
    date: "23 Sep 2026",
    rating: "—",
    image: "",
    description:
      "A romantic OTT title included in this week's watchlist.",
    trailer: "#"
  }
];


const series = [
  {
    title: "Shaque: Trust No One",
    tag: "Netflix",
    category: "Mystery Thriller",
    genre: "Mystery Thriller",
    language: "Hindi",
    date: "24 Sep 2026",
    rating: "—",
    image:
      "https://occ-0-7977-2774.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZaqthoMMZj-YgtRmNNSg4nqtB4gVOyFb47vITtrSTvFTPI6m2pWg2kmHgtpoX2PRxi30jBRHiC2ecphoka7YJE6LRVEGkexIUTB.jpg?r=5f2",
    description:
      "A mystery thriller highlighted among the latest web series.",
    trailer: "#"
  },

  {
    title: "Hunkkaar: The Roar",
    tag: "JioHotstar",
    category: "Crime Thriller",
    genre: "Crime Thriller",
    language: "Hindi",
    date: "25 Sep 2026",
    rating: "—",
    image: "",
    description:
      "A crime thriller included in the current series lineup.",
    trailer: "#"
  },

  {
    title: "UNABOMBER",
    tag: "Netflix",
    category: "Crime Drama",
    genre: "Crime Drama",
    language: "English",
    date: "2026",
    rating: "—",
    image:
      "https://occ-0-7977-2774.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZaqthoMMZj-YgtRmNNSg4nqtB4gVOyFb47vITtrSTvFTPI6m2pWg2kmHgtpoX2PRxi30jBRHiC2ecphoka7YJE6LRVEGkexIUTB.jpg?r=5f2",
    description:
      "A crime drama title featured in the FilmyRadarIndia series section.",
    trailer: "#"
  },

  {
    title: "Rise & Fall Season 2",
    tag: "JioHotstar",
    category: "Reality",
    genre: "Reality",
    language: "Hindi",
    date: "Sep 2026",
    rating: "—",
    image: "",
    description:
      "A reality series title featured on FilmyRadarIndia.",
    trailer: "#"
  }
];


const upcoming = [
  {
    title: "Kantara: Chapter 1",
    tag: "South",
    category: "Kannada",
    genre: "Action Drama",
    language: "Kannada",
    date: "Upcoming 2026",
    rating: "—",
    image: "",
    description:
      "An upcoming South Indian title to keep on your radar.",
    trailer: "#"
  },

  {
    title: "Dhurandhar",
    tag: "Bollywood",
    category: "Hindi",
    genre: "Action",
    language: "Hindi",
    date: "Upcoming",
    rating: "—",
    image: "",
    description:
      "An upcoming Hindi movie featured in the FilmyRadarIndia radar.",
    trailer: "#"
  },

  {
    title: "The Raja Saab",
    tag: "South",
    category: "Telugu",
    genre: "Drama",
    language: "Telugu",
    date: "Upcoming",
    rating: "—",
    image: "",
    description:
      "An upcoming Telugu title to watch.",
    trailer: "#"
  },

  {
    title: "Toxic",
    tag: "South",
    category: "Kannada",
    genre: "Action",
    language: "Kannada",
    date: "Upcoming",
    rating: "—",
    image: "",
    description:
      "An upcoming Kannada title featured in the upcoming section.",
    trailer: "#"
  }
];


const news = [
  [
    "OTT THIS WEEK",
    "New OTT Releases: Shaque, Hunkkaar, Don't Be Shy & More",
    "27 Sep 2026"
  ],

  [
    "NETFLIX",
    "Shaque: Trust No One — Everything You Need To Know",
    "27 Sep 2026"
  ],

  [
    "JIOHOTSTAR",
    "Hunkkaar: The Roar Now Streaming on JioHotstar",
    "27 Sep 2026"
  ],

  [
    "PRIME VIDEO",
    "The Love Hypothesis and Don't Be Shy Arrive on Prime Video",
    "27 Sep 2026"
  ]
];


const trending = [
  [
    "Shaque: Trust No One",
    "Netflix · Thriller"
  ],

  [
    "Hunkkaar: The Roar",
    "JioHotstar · Crime"
  ],

  [
    "UNABOMBER",
    "Netflix · Crime Drama"
  ],

  [
    "Don't Be Shy",
    "Prime Video · Drama"
  ],

  [
    "The Love Hypothesis",
    "Prime Video · Romance"
  ]
];


/* =========================================================
   COMBINE DATA
========================================================= */

const allTitles = [
  ...movies,
  ...ott,
  ...series,
  ...upcoming
];


/* =========================================================
   HELPERS
========================================================= */

function slugify(text) {

  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

}


function safeImage(image, title) {

  if (image && image.trim() !== "") {
    return image;
  }

  /*
    Placeholder is generated using a gradient instead of
    showing a broken image.
  */

  return `https://placehold.co/600x900/101827/ffffff?text=${encodeURIComponent(
    title
  )}`;

}


function getRating(x) {

  if (x.rating && x.rating !== "—") {
    return `⭐ ${x.rating}`;
  }

  return "NEW";

}


/* =========================================================
   MOVIE CARD
========================================================= */

function card(x) {

  const slug = slugify(x.title);

  return `

    <article
      class="movie-card searchable"
      data-title="
        ${x.title}
        ${x.tag}
        ${x.category}
        ${x.genre}
        ${x.language}
      "
      data-slug="${slug}"
      onclick="openDetails('${slug}')"
    >

      <div
        class="poster"
        style="
          background-image:
          linear-gradient(
            180deg,
            rgba(0,0,0,.04) 20%,
            rgba(0,0,0,.94) 100%
          ),
          url('${safeImage(x.image, x.title)}');

          background-size:cover;
          background-position:center;
        "
      >

        <span class="badge">
          ${x.tag}
        </span>

        <span class="rating">
          ${getRating(x)}
        </span>

        <button
          class="watchlist-btn"
          onclick="event.stopPropagation(); addToWatchlist('${slug}')"
          aria-label="Add to watchlist"
        >
          ＋
        </button>

        <span class="poster-title">
          ${x.title}
        </span>

      </div>

      <div class="card-meta">

        <h3>
          ${x.title}
        </h3>

        <p>
          ${x.date}
          ·
          <span class="star">
            ${
              x.rating !== "—"
                ? `★ ${x.rating}`
                : "New Release"
            }
          </span>
        </p>

      </div>

    </article>

  `;
}


/* =========================================================
   RENDER CARDS
========================================================= */

function render(id, data) {

  const element =
    document.getElementById(id);

  if (!element) return;

  element.innerHTML =
    data
      .map(card)
      .join("");

}


render("movieGrid", movies);
render("ottGrid", ott);
render("seriesGrid", series);
render("upcomingGrid", upcoming);


/* =========================================================
   NEWS
========================================================= */

const newsList =
  document.getElementById("newsList");


if (newsList) {

  newsList.innerHTML =
    news
      .map(n => {

        return `

          <article
            class="news-item searchable"
            data-title="${n[0]} ${n[1]}"
          >

            <div class="news-thumb">
              📰
            </div>

            <div>

              <span>
                ${n[2]} · FILMYRADAR
              </span>

              <h3>
                ${n[1]}
              </h3>

              <p>
                Latest entertainment update,
                OTT information and
                what-to-watch details.
              </p>

            </div>

          </article>

        `;

      })
      .join("");

}


/* =========================================================
   TRENDING
========================================================= */

const trendingList =
  document.getElementById("trendingList");


if (trendingList) {

  trendingList.innerHTML =
    trending
      .map((x, i) => {

        return `

          <div
            class="trend searchable"
            data-title="${x[0]} ${x[1]}"
          >

            <span class="trend-num">
              ${i + 1}
            </span>

            <span class="mini-poster">
              🎬
            </span>

            <span>

              <b>
                ${x[0]}
              </b>

              <small>
                ${x[1]}
              </small>

            </span>

          </div>

        `;

      })
      .join("");

}


/* =========================================================
   SEARCH
========================================================= */

const searchBtn =
  document.getElementById("searchBtn");

const searchBar =
  document.getElementById("searchBar");

const input =
  document.getElementById("searchInput");

const clearSearch =
  document.getElementById("clearSearch");


if (searchBtn) {

  searchBtn.onclick = () => {

    searchBar.classList.toggle("open");

    if (
      searchBar.classList.contains("open") &&
      input
    ) {

      input.focus();

    }

  };

}


function filter(q) {

  const query =
    q.toLowerCase().trim();

  const all =
    document.querySelectorAll(".searchable");

  let found = 0;

  all.forEach(el => {

    const title =
      (el.dataset.title || "")
        .toLowerCase();

    if (
      query === "" ||
      title.includes(query)
    ) {

      el.style.display = "";

      found++;

    } else {

      el.style.display = "none";

    }

  });

  if (query && found === 0) {

    showToast(
      `No results found for "${q}"`
    );

  }

}


if (input) {

  input.addEventListener(
    "input",
    e => filter(e.target.value)
  );

}


if (clearSearch) {

  clearSearch.onclick = () => {

    if (input) {

      input.value = "";

      filter("");

      input.focus();

    }

  };

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

document
  .querySelectorAll(".tags button")
  .forEach(button => {

    button.onclick = () => {

      if (searchBar) {
        searchBar.classList.add("open");
      }

      if (input) {

        input.value =
          button.textContent.trim();

        filter(input.value);

      }

    };

  });


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
  document.getElementById("menuBtn");

const nav =
  document.getElementById("mainNav");


if (menuBtn && nav) {

  menuBtn.onclick = () => {

    nav.classList.toggle("open");

  };

}


document
  .querySelectorAll("#mainNav a")
  .forEach(a => {

    a.onclick = () => {

      if (nav) {
        nav.classList.remove("open");
      }

    };

  });


/* =========================================================
   WATCHLIST
========================================================= */

function getWatchlist() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "filmyRadarWatchlist"
      )
    ) || [];

  } catch {

    return [];

  }

}


function addToWatchlist(slug) {

  const list =
    getWatchlist();

  if (!list.includes(slug)) {

    list.push(slug);

    localStorage.setItem(
      "filmyRadarWatchlist",
      JSON.stringify(list)
    );

    showToast(
      "Added to your watchlist ✓"
    );

  } else {

    showToast(
      "Already in your watchlist"
    );

  }

}


/* =========================================================
   DETAIL MODAL
========================================================= */

function openDetails(slug) {

  const item =
    allTitles.find(
      x => slugify(x.title) === slug
    );

  if (!item) return;


  const old =
    document.getElementById(
      "movieDetailModal"
    );

  if (old) {
    old.remove();
  }


  const modal =
    document.createElement("div");

  modal.id =
    "movieDetailModal";

  modal.className =
    "movie-detail-modal";


  modal.innerHTML = `

    <div
      class="detail-backdrop"
      onclick="closeDetails()"
    ></div>

    <div class="detail-card">

      <button
        class="detail-close"
        onclick="closeDetails()"
        aria-label="Close"
      >
        ×
      </button>

      <div class="detail-poster">

        <img
          src="${safeImage(
            item.image,
            item.title
          )}"
          alt="${item.title}"
        >

      </div>

      <div class="detail-content">

        <span class="badge">
          ${item.tag}
        </span>

        <h2>
          ${item.title}
        </h2>

        <div class="detail-rating">
          ${getRating(item)}
        </div>

        <p class="detail-description">
          ${item.description}
        </p>

        <div class="detail-info">

          <div>
            <small>Release</small>
            <b>${item.date}</b>
          </div>

          <div>
            <small>Genre</small>
            <b>${item.genre}</b>
          </div>

          <div>
            <small>Language</small>
            <b>${item.language}</b>
          </div>

          <div>
            <small>Platform</small>
            <b>${item.tag}</b>
          </div>

        </div>

        <div class="detail-actions">

          <button
            class="btn primary"
            onclick="addToWatchlist('${slug}')"
          >
            ＋ Add to Watchlist
          </button>

          ${
            item.trailer &&
            item.trailer !== "#"
              ? `
                <a
                  class="btn ghost"
                  href="${item.trailer}"
                  target="_blank"
                  rel="noopener"
                >
                  ▶ Watch Trailer
                </a>
              `
              : ""
          }

        </div>

      </div>

    </div>

  `;


  document.body.appendChild(modal);

  document.body.style.overflow =
    "hidden";

}


function closeDetails() {

  const modal =
    document.getElementById(
      "movieDetailModal"
    );

  if (modal) {

    modal.remove();

    document.body.style.overflow =
      "";

  }

}


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeDetails();

    }

  }
);


/* =========================================================
   SUBSCRIBE
========================================================= */

const toast =
  document.getElementById("toast");


function showToast(message) {

  if (!toast) return;

  toast.textContent =
    message;

  toast.classList.add("show");


  setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);

}


const subscribeForm =
  document.getElementById(
    "subscribeForm"
  );


if (subscribeForm) {

  subscribeForm.onsubmit =
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

    };

}


/* =========================================================
   HERO DOTS
========================================================= */

document
  .querySelectorAll(".dots i")
  .forEach((dot, index) => {

    dot.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".dots i")
          .forEach(d =>
            d.classList.remove("on")
          );

        dot.classList.add("on");

        /*
          Future:
          Hero carousel data can be
          connected here.
        */

      }
    );

  });


/* =========================================================
   GLOBAL EXPORTS
========================================================= */

window.openDetails =
  openDetails;

window.closeDetails =
  closeDetails;

window.addToWatchlist =
  addToWatchlist;


/* =========================================================
   CONSOLE
========================================================= */

console.log(
  "🎬 FilmyRadarIndia loaded successfully."
);

console.log(
  `📚 ${allTitles.length} titles loaded.`
);
