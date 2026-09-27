const movies=[
  {title:"War 2",tag:"Bollywood",date:"14 Aug 2025",rating:"7.2",c1:"#263b4c",c2:"#0b1627"},
  {title:"Coolie",tag:"South",date:"14 Aug 2025",rating:"7.8",c1:"#6d321e",c2:"#16120e"},
  {title:"Saiyaara",tag:"Bollywood",date:"18 Jul 2025",rating:"8.1",c1:"#344f63",c2:"#321c2c"},
  {title:"The Conjuring",tag:"Hollywood",date:"05 Sep 2025",rating:"7.0",c1:"#182b2e",c2:"#080b12"}
];
const ott=[
  {title:"The Family Man S3",tag:"Prime Video",date:"18 Jul 2026",rating:"8.8",c1:"#1b455a",c2:"#0b111c"},
  {title:"Squid Game S3",tag:"Netflix",date:"27 Jun 2026",rating:"8.0",c1:"#26564e",c2:"#241c3d"},
  {title:"Housefull 5",tag:"JioHotstar",date:"06 Jun 2026",rating:"6.8",c1:"#795c31",c2:"#281b17"},
  {title:"Kuberaa",tag:"Netflix",date:"27 Jun 2026",rating:"7.5",c1:"#314b4b",c2:"#111820"}
];
const series=[
  {title:"Panchayat S4",tag:"Prime Video",date:"24 Jun 2026",rating:"8.6",c1:"#6b5728",c2:"#233323"},
  {title:"The Old Guard 2",tag:"Netflix",date:"02 Jul 2026",rating:"7.0",c1:"#26394c",c2:"#10131c"},
  {title:"Mirzapur",tag:"Prime Video",date:"Coming Soon",rating:"8.2",c1:"#5b2921",c2:"#11110e"},
  {title:"Squid Game S3",tag:"Netflix",date:"27 Jun 2026",rating:"8.0",c1:"#244e47",c2:"#28193b"}
];
const upcoming=[
  {title:"Kantara Chapter 1",tag:"South",date:"02 Oct 2026",rating:"—",c1:"#713b20",c2:"#15110d"},
  {title:"Dhurandhar",tag:"Bollywood",date:"06 Dec 2026",rating:"—",c1:"#4a4b45",c2:"#10151b"},
  {title:"The Raja Saab",tag:"South",date:"06 Dec 2026",rating:"—",c1:"#693f67",c2:"#141426"},
  {title:"Pushpa 2 Re-Release",tag:"South",date:"05 Oct 2026",rating:"—",c1:"#70471f",c2:"#17140d"}
];
const news=[
  ["OTT RELEASES THIS WEEK","This Week on OTT: 5 Must-Watch Releases","25 Sep 2026"],
  ["TOP PICKS","Top 10 Underrated Indian Movies You Should Watch","23 Sep 2026"],
  ["BOLLYWOOD","Upcoming Bollywood Movies — Full List","20 Sep 2026"],
  ["REVIEWS","What to Watch This Weekend? Our Latest Picks","18 Sep 2026"]
];

function card(x){
 return `<article class="movie-card searchable" data-title="${x.title} ${x.tag}">
   <div class="poster" style="--c1:${x.c1};--c2:${x.c2}">
     <span class="badge">${x.tag}</span><span class="rating">${x.rating!=="—"?"⭐ "+x.rating:"UPCOMING"}</span>
     <span class="poster-title">${x.title}</span>
   </div>
   <div class="card-meta"><h3>${x.title}</h3><p>${x.date} · <span class="star">${x.rating!=="—"?"★ "+x.rating:"Coming Soon"}</span></p></div>
 </article>`;
}
function render(id,data){document.getElementById(id).innerHTML=data.map(card).join("")}
render("movieGrid",movies);render("ottGrid",ott);render("seriesGrid",series);render("upcomingGrid",upcoming);

document.getElementById("newsList").innerHTML=news.map(n=>`<article class="news-item searchable" data-title="${n[0]} ${n[1]}"><div class="news-thumb">${n[0]}</div><div><span>${n[2]} · FILMYRADAR</span><h3>${n[1]}</h3><p>Latest entertainment update, release information and what-to-watch details.</p></div></article>`).join("");

const trending=[["The Family Man S3","Web Series · Prime Video"],["War 2","Movie · Bollywood"],["Coolie","Movie · South"],["Squid Game S3","Web Series · Netflix"],["The Old Guard 2","Movie · Netflix"]];
document.getElementById("trendingList").innerHTML=trending.map((x,i)=>`<div class="trend"><span class="trend-num">${i+1}</span><span class="mini-poster">🎬</span><span><b>${x[0]}</b><small>${x[1]}</small></span></div>`).join("");

const menuBtn=document.getElementById("menuBtn"), nav=document.getElementById("mainNav");
menuBtn.onclick=()=>nav.classList.toggle("open");
document.querySelectorAll("#mainNav a").forEach(a=>a.onclick=()=>nav.classList.remove("open"));

const searchBtn=document.getElementById("searchBtn"), searchBar=document.getElementById("searchBar"), input=document.getElementById("searchInput");
searchBtn.onclick=()=>{searchBar.classList.toggle("open");if(searchBar.classList.contains("open"))input.focus()};
document.getElementById("clearSearch").onclick=()=>{input.value="";filter("")};
function filter(q){
 const all=document.querySelectorAll(".searchable");let found=0;
 all.forEach(el=>{const ok=el.dataset.title.toLowerCase().includes(q.toLowerCase());el.style.display=ok?"":"none";if(ok)found++});
}
input.addEventListener("input",e=>filter(e.target.value));

const toast=document.getElementById("toast");
function showToast(msg){toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2500)}
document.getElementById("subscribeForm").onsubmit=e=>{e.preventDefault();showToast("Thanks! You’re subscribed to FilmyRadarIndia.");e.target.reset();document.getElementById("subscribeMsg").textContent="Subscription received ✓"};
document.querySelectorAll(".tags button").forEach(b=>b.onclick=()=>{document.getElementById("searchBar").classList.add("open");input.value=b.textContent;filter(b.textContent)});
