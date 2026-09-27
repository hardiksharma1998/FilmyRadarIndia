const BASE_URL = "https://api.themoviedb.org/3";

export default async function handler(req, res) {
  try {
    const token = process.env.TMDB_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "TMDB_TOKEN is missing in Vercel Environment Variables"
      });
    }

    const action = req.query.action || "trending";
    const query = req.query.query || "";

    let endpoint = "";

    switch (action) {
      case "trending":
        endpoint = "/trending/all/week?language=en-US";
        break;

      case "movies":
        endpoint =
          "/movie/now_playing?language=en-US&region=IN&page=1";
        break;

      case "popularMovies":
        endpoint =
          "/movie/popular?language=en-US&region=IN&page=1";
        break;

      case "tv":
        endpoint =
          "/tv/popular?language=en-US&page=1";
        break;

      case "upcoming":
        endpoint =
          "/movie/upcoming?language=en-US&region=IN&page=1";
        break;

      case "ott":
        endpoint =
          "/discover/movie?language=en-US&region=IN&watch_region=IN&with_watch_monetization_types=flatrate&sort_by=popularity.desc&page=1";
        break;

      case "search":
        if (!query.trim()) {
          return res.status(400).json({
            error: "Search query is required"
          });
        }

        endpoint =
          `/search/multi?query=${encodeURIComponent(
            query
          )}&include_adult=false&language=en-US&page=1`;
        break;

      default:
        return res.status(400).json({
          error: "Invalid action"
        });
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.status_message || "TMDB API error"
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch TMDB data"
    });
  }
}
