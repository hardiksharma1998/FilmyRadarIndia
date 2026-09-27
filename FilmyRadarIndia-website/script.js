/*
  FILMYRADARINDIA
  Current content: September 2026
*/

const movies = [

  {
    title: "UNABOMBER",
    tag: "Netflix",
    category: "Hollywood",
    date: "Sep 2026",
    rating: "—",
    image: "https://occ-0-7977-2774.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZaqthoMMZj-YgtRmNNSg4nqtB4gVOyFb47vITtrSTvFTPI6m2pWg2kmHgtpoX2PRxi30jBRHiC2ecphoka7YJE6LRVEGkexIUTB.jpg?r=5f2"
  },

  {
    title: "The Love Hypothesis",
    tag: "Prime Video",
    category: "Hollywood",
    date: "23 Sep 2026",
    rating: "—",
    image: "https://image.tmdb.org/t/p/w780/placeholder.jpg"
  },

  {
    title: "Don't Be Shy",
    tag: "Prime Video",
    category: "Bollywood",
    date: "25 Sep 2026",
    rating: "—",
    image: "https://image.tmdb.org/t/p/w780/placeholder.jpg"
  },

  {
    title: "Toxic: A Fairy Tale for Grown-Ups",
    tag: "ZEE5",
    category: "South",
    date: "25 Sep 2026",
    rating: "—",
    image: "https://image.tmdb.org/t/p/w780/placeholder.jpg"
  }

];


const ott = [

  {
    title: "Shaque: Trust No One",
    tag: "Netflix",
    category: "Web Series",
    date: "24 Sep 2026",
    rating: "—",
    image: "https://occ-0-7977-2774.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZaqthoMMZj-YgtRmNNSg4nqtB4gVOyFb47vITtrSTvFTPI6m2pWg2kmHgtpoX2PRxi30jBRHiC2ecphoka7YJE6LRVEGkexIUTB.jpg?r=5f2"
  },

  {
    title: "Hunkkaar: The Roar",
    tag: "JioHotstar",
    category: "Hindi",
    date: "25 Sep 2026",
    rating: "—",
    image: "https://image.tmdb.org/t/p/w780/placeholder.jpg"
  },

  {
    title: "Don't Be Shy",
    tag: "Prime Video",
    category: "Hindi",
    date: "25 Sep 2026",
    rating: "—",
    image: "https://image.tmdb.org/t/p/w780/placeholder.jpg"
  },

  {
    title: "Mango Pachcha",
    tag: "JioHotstar",
    category: "Kannada",
    date: "25 Sep 2026",
    rating: "8.8",
    image: "https://image.tmdb.org/t/p/w780/placeholder.jpg"
  },

  {
    title: "The Love Hypothesis",
    tag: "Prime Video",
    category: "English",
    date: "23 Sep 2026",
    rating: "—",
    image: "https://image.tmdb.org/t/p/w780/placeholder.jpg"
  }

];


const series = [

  {
    title: "Shaque: Trust No One",
    tag: "Netflix",
    category: "Mystery Thriller",
    date: "24 Sep 2026",
    rating: "—",
    image: "https://occ-0-7977-2774.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZaqthoMMZj-YgtRmNNSg4nqtB4gVOyFb47vITtrSTvFTPI6m2pWg2kmHgtpoX2PRxi30jBRHiC2ecphoka7YJE6LRVEGkexIUTB.jpg?r=5f2"
  },

  {
    title: "Hunkkaar: The Roar",
    tag: "JioHotstar",
    category: "Crime Thriller",
    date: "25 Sep 2026",
    rating: "—",
    image: "https://image.tmdb.org/t/p/w780/placeholder.jpg"
  },

  {
    title: "UNABOMBER",
    tag: "Netflix",
    category: "Crime Drama",
    date: "2026",
    rating: "—",
    image: "https://occ-0-7977-2774.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZaqthoMMZj-YgtRmNNSg4nqtB4gVOyFb47vITtrSTvFTPI6m2pWg2kmHgtpoX2PRxi30jBRHiC2ecphoka7YJE6LRVEGkexIUTB.jpg?r=5f2"
  },

  {
    title: "Rise & Fall Season 2",
    tag: "JioHotstar",
    category: "Reality",
    date: "Sep 2026",
    rating: "—",
    image: "https://image.tmdb.org/t/p/w780/placeholder.jpg"
  }

];


const upcoming = [

  {
    title: "Kantara: Chapter 1",
    tag: "South",
    category: "Kannada",
    date: "Upcoming 2026",
    rating: "—",
    image: "https://image.tmdb.org/t/p/w780/placeholder.jpg"
  },

  {
    title: "Dhurandhar",
    tag: "Bollywood",
    category: "Hindi",
    date: "Upcoming",
    rating: "—",
    image: "https://image.tmdb.org/t/p/w780/placeholder.jpg"
  },

  {
    title: "The Raja Saab",
    tag: "South",
    category: "Telugu",
    date: "Upcoming",
    rating: "—",
    image: "https://image.tmdb.org/t/p/w780/placeholder.jpg"
  },

  {
    title: "Toxic",
    tag: "South",
    category: "Kannada",
    date: "Upcoming",
    rating: "—",
    image: "https://image.tmdb.org/t/p/w780/placeholder.jpg"
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


function card(x) {

  const rating =
    x.rating !== "—"
      ? `⭐ ${x.rating}`
      : "NEW";

  return `

    <article
      class="movie-card searchable"
      data-title="${x.title} ${x.tag} ${x.category}"
    >

      <div
        class="poster"
        style="
          --c1:#162033;
          --c2:#05070c;
          background-image:
          linear-gradient(
            180deg,
            rgba(0,0,0,.05) 20%,
            rgba(0,0,0,.92) 100%
          ),
          url('${x.image}');
          background-size:cover;
          background-position:center;
        "
      >

        <span class="badge">
          ${x.tag}
        </span>

        <span class="rating">
          ${rating}
        </span>

        <span class="poster-title">
          ${x.title}
        </span>

      </div>

      <div class="card-meta">

        <h3>${x.title}</h3>

        <p>
          ${x.date}
          ·
          <span class="star">
            ${x.rating !== "—" ? `★ ${x.rating}` : "New Release"}
          </span>
        </p>

      </div>

    </article>

  `;
}


function render(id, data) {

  const element = document.getElementById(id);

  if (!element) return;

  element.innerHTML = data
    .map(card)
    .join("");

}


render("movieGrid", movies);
render("ottGrid", ott);
render("seriesGrid", series);
render("upcomingGrid", upcoming);



/* NEWS */

document.getElementById("newsList").innerHTML = news
  .map(n => {

    return `

      <article
        class="news-item searchable"
        data-title="${n[0]} ${n[1]}"
      >

        <div class="news-thumb">
          ${n[0]}
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



/* TRENDING */

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


document.getElementById("trendingList").innerHTML =
  trending
    .map((x, i) => {

      return `

        <div class="trend">

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



/* MOBILE MENU */

const menuBtn =
  document.getElementById("menuBtn");

const nav =
  document.getElementById("mainNav");


if (menuBtn) {

  menuBtn.onclick = () => {

    nav.classList.toggle("open");

  };

}


document
  .querySelectorAll("#mainNav a")
  .forEach(a => {

    a.onclick = () => {

      nav.classList.remove("open");

    };

  });



/* SEARCH */

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

    if (searchBar.classList.contains("open")) {

      input.focus();

    }

  };

}


function filter(q) {

  const query =
    q.toLowerCase().trim();

  const all =
    document.querySelectorAll(".searchable");

  all.forEach(el => {

    const title =
      el.dataset.title.toLowerCase();

    el.style.display =
      title.includes(query)
        ? ""
        : "none";

  });

}


input.addEventListener(
  "input",
  e => filter(e.target.value)
);


clearSearch.onclick = () => {

  input.value = "";

  filter("");

};



/* CATEGORY FILTER */

document
  .querySelectorAll(".tags button")
  .forEach(button => {

    button.onclick = () => {

      searchBar.classList.add("open");

      input.value =
        button.textContent.trim();

      filter(input.value);

    };

  });



/* SUBSCRIBE */

const toast =
  document.getElementById("toast");


function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);

}


document
  .getElementById("subscribeForm")
  .onsubmit = event => {

    event.preventDefault();

    showToast(
      "Thanks! You're subscribed to FilmyRadarIndia."
    );

    event.target.reset();

    document.getElementById(
      "subscribeMsg"
    ).textContent =
      "Subscription received ✓";

  };
