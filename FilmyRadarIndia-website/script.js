/* =========================================================
   FILMYRADARINDIA - STABLE SCRIPT
========================================================= */

const movies = [
  {
    title: "UNABOMBER",
    tag: "Netflix",
    genre: "Crime Drama",
    language: "English",
    date: "Sep 2026",
    rating: "NEW"
  },
  {
    title: "The Love Hypothesis",
    tag: "Prime Video",
    genre: "Romance",
    language: "English",
    date: "23 Sep 2026",
    rating: "NEW"
  },
  {
    title: "Don't Be Shy",
    tag: "Prime Video",
    genre: "Drama",
    language: "Hindi",
    date: "25 Sep 2026",
    rating: "NEW"
  },
  {
    title: "Toxic: A Fairy Tale for Grown-Ups",
    tag: "ZEE5",
    genre: "Action Drama",
    language: "Kannada",
    date: "25 Sep 2026",
    rating: "NEW"
  }
];

const ott = [
  {
    title: "Shaque: Trust No One",
    tag: "Netflix",
    genre: "Mystery Thriller",
    language: "Hindi",
    date: "24 Sep 2026",
    rating: "NEW"
  },
  {
    title: "Hunkkaar: The Roar",
    tag: "JioHotstar",
    genre: "Crime Thriller",
    language: "Hindi",
    date: "25 Sep 2026",
    rating: "NEW"
  },
  {
    title: "Don't Be Shy",
    tag: "Prime Video",
    genre: "Drama",
    language: "Hindi",
    date: "25 Sep 2026",
    rating: "NEW"
  },
  {
    title: "Mango Pachcha",
    tag: "JioHotstar",
    genre: "Drama",
    language: "Kannada",
    date: "25 Sep 2026",
    rating: "8.8"
  },
  {
    title: "The Love Hypothesis",
    tag: "Prime Video",
    genre: "Romance",
    language: "English",
    date: "23 Sep 2026",
    rating: "NEW"
  }
];

const series = [
  {
    title: "Shaque: Trust No One",
    tag: "Netflix",
    genre: "Mystery Thriller",
    language: "Hindi",
    date: "24 Sep 2026",
    rating: "NEW"
  },
  {
    title: "Hunkkaar: The Roar",
    tag: "JioHotstar",
    genre: "Crime Thriller",
    language: "Hindi",
    date: "25 Sep 2026",
    rating: "NEW"
  },
  {
    title: "UNABOMBER",
    tag: "Netflix",
    genre: "Crime Drama",
    language: "English",
    date: "2026",
    rating: "NEW"
  },
  {
    title: "Rise & Fall Season 2",
    tag: "JioHotstar",
    genre: "Reality",
    language: "Hindi",
    date: "Sep 2026",
    rating: "NEW"
  }
];

const upcoming = [
  {
    title: "Kantara: Chapter 1",
    tag: "South",
    genre: "Action Drama",
    language: "Kannada",
    date: "Upcoming 2026",
    rating: "NEW"
  },
  {
    title: "Dhurandhar",
    tag: "Bollywood",
    genre: "Action",
    language: "Hindi",
    date: "Upcoming",
    rating: "NEW"
  },
  {
    title: "The Raja Saab",
    tag: "South",
    genre: "Drama",
    language: "Telugu",
    date: "Upcoming",
    rating: "NEW"
  },
  {
    title: "Toxic",
    tag: "South",
    genre: "Action",
    language: "Kannada",
    date: "Upcoming",
    rating: "NEW"
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
  ["Shaque: Trust No One", "Netflix · Thriller"],
  ["Hunkkaar: The Roar", "JioHotstar · Crime"],
  ["UNABOMBER", "Netflix · Crime Drama"],
  ["Don't Be Shy", "Prime Video · Drama"],
  ["The Love Hypothesis", "Prime Video · Romance"]
];


/* =========================================================
   CARD
========================================================= */

function createCard(item) {

  return `
    <article class="movie-card searchable"
      data-title="${item.title} ${item.tag} ${item.genre} ${item.language}">

      <div class="poster"
        style="
          background:
          linear-gradient(
            180deg,
            rgba(0,0,0,.05) 20%,
            rgba(0,0,0,.92) 100%
          ),
          linear-gradient(
            135deg,
            #294863,
            #111827
          );
        ">

        <span class="badge">
          ${item.tag}
        </span>

        <span class="rating">
          ${item.rating === "NEW" ? "NEW" : "⭐ " + item.rating}
        </span>

        <span class="poster-title">
          ${item.title}
        </span>

      </div>

      <div class="card-meta">

        <h3>${item.title}</h3>

        <p>
          ${item.date}
          ·
          <span class="star">
            ${item.rating === "NEW" ? "New Release" : "★ " + item.rating}
          </span>
        </p>

      </div>

    </article>
  `;
}


/* =========================================================
   RENDER
========================================================= */

function renderGrid(id, data) {

  const container = document.getElementById(id);

  if (!container) {
    console.error("Missing element:", id);
    return;
  }

  container.innerHTML = data.map(createCard).join("");
}


renderGrid("movieGrid", movies);
renderGrid("ottGrid", ott);
renderGrid("seriesGrid", series);
renderGrid("upcomingGrid", upcoming);


/* =========================================================
   NEWS
========================================================= */

const newsList = document.getElementById("newsList");

if (newsList) {

  newsList.innerHTML = news.map(item => {

    return `
      <article
        class="news-item searchable"
        data-title="${item[0]} ${item[1]}">

        <div class="news-thumb">
          📰
        </div>

        <div>

          <span>
            ${item[2]} · FILMYRADAR
          </span>

          <h3>
            ${item[1]}
          </h3>

          <p>
            Latest entertainment update,
            OTT information and
            what-to-watch details.
          </p>

        </div>

      </article>
    `;

  }).join("");
}


/* =========================================================
   TRENDING
========================================================= */

const trendingList = document.getElementById("trendingList");

if (trendingList) {

  trendingList.innerHTML = trending.map((item, index) => {

    return `
      <div
        class="trend searchable"
        data-title="${item[0]} ${item[1]}">

        <span class="trend-num">
          ${index + 1}
        </span>

        <span class="mini-poster">
          🎬
        </span>

        <span>

          <b>${item[0]}</b>

          <small>
            ${item[1]}
          </small>

        </span>

      </div>
    `;

  }).join("");
}


/* =========================================================
   SEARCH
========================================================= */

const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("searchBar");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

if (searchBtn && searchBar) {

  searchBtn.addEventListener("click", function () {

    searchBar.classList.toggle("open");

    if (
      searchBar.classList.contains("open") &&
      searchInput
    ) {
      searchInput.focus();
    }

  });

}


function filterResults(value) {

  const query = value.toLowerCase().trim();

  const items =
    document.querySelectorAll(".searchable");

  items.forEach(item => {

    const text =
      (item.dataset.title || "").toLowerCase();

    item.style.display =
      !query || text.includes(query)
        ? ""
        : "none";
  });
}


if (searchInput) {

  searchInput.addEventListener(
    "input",
    function () {
      filterResults(this.value);
    }
  );

}


if (clearSearch) {

  clearSearch.addEventListener(
    "click",
    function () {

      if (searchInput) {

        searchInput.value = "";

        filterResults("");

        searchInput.focus();

      }

    }
  );

}


/* =========================================================
   CATEGORY BUTTONS
========================================================= */

document
  .querySelectorAll(".tags button")
  .forEach(button => {

    button.addEventListener(
      "click",
      function () {

        const value =
          this.textContent.trim();

        if (searchBar) {
          searchBar.classList.add("open");
        }

        if (searchInput) {

          searchInput.value = value;

          filterResults(value);

          searchInput.focus();

        }

      }
    );

  });


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {

  menuBtn.addEventListener(
    "click",
    function () {

      mainNav.classList.toggle("open");

    }
  );

}


document
  .querySelectorAll("#mainNav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      function () {

        if (mainNav) {
          mainNav.classList.remove("open");
        }

      }
    );

  });


/* =========================================================
   SUBSCRIBE
========================================================= */

const subscribeForm =
  document.getElementById("subscribeForm");

const toast =
  document.getElementById("toast");


function showToast(message) {

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(function () {

    toast.classList.remove("show");

  }, 2500);
}


if (subscribeForm) {

  subscribeForm.addEventListener(
    "submit",
    function (event) {

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

    }
  );

}


/* =========================================================
   HERO DOTS
========================================================= */

document
  .querySelectorAll(".dots i")
  .forEach(dot => {

    dot.addEventListener(
      "click",
      function () {

        document
          .querySelectorAll(".dots i")
          .forEach(d =>
            d.classList.remove("on")
          );

        this.classList.add("on");

      }
    );

  });


/* =========================================================
   FINISHED
========================================================= */

console.log(
  "🎬 FilmyRadarIndia loaded successfully."
);

console.log(
  "Movies:",
  movies.length
);

console.log(
  "OTT:",
  ott.length
);

console.log(
  "Series:",
  series.length
);

console.log(
  "Upcoming:",
  upcoming.length
);
