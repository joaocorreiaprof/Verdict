import axios from "axios";

const API = axios.create({
  baseURL: "/api/movies",
});

export const getTrending = async () => {
  const response = await API.get("/trending");
  return response.data;
};

export const getRandomTrendingMovie = async () => {
  const response = await API.get("/trending/random");
  return response.data;
};

export const getMovieVideos = async (id: number, mediaType: string) => {
  const { data } = await axios.get(`/api/movies/${mediaType}/${id}/videos`);
  return data;
};

export const getDiscover = async () => {
  const response = await API.get("/discover");
  return response.data;
};

export const getPopularMovies = async () => {
  const response = await API.get("/popular");
  return response.data;
};

export const getTopRatedMovies = async () => {
  const response = await API.get("/top-rated");
  return response.data;
};

export const getUpcomingMovies = async () => {
  const response = await API.get("/upcoming");
  return response.data;
};

export const getNowPlayingMovies = async () => {
  const response = await API.get("/now-playing");
  return response.data;
};

export const getRecentPopularComedyMovies = async () => {
  const response = await API.get("/recent-popular-comedy");
  return response.data;
};

export const getRecentPopularActionMovies = async () => {
  const response = await API.get("/recent-popular-action");
  return response.data;
};

export const getRecentPopularAdventureMovies = async () => {
  const response = await API.get("/recent-popular-adventure");
  return response.data;
};

export const getRecentPopularAnimationMovies = async () => {
  const response = await API.get("/recent-popular-animation");
  return response.data;
};

export const getRecentPopularCrimeMovies = async () => {
  const response = await API.get("/recent-popular-crime");
  return response.data;
};

export const getRecentPopularDocumentaryMovies = async () => {
  const response = await API.get("/recent-popular-documentary");
  return response.data;
};

export const getRecentPopularDramaMovies = async () => {
  const response = await API.get("/recent-popular-drama");
  return response.data;
};
export const getRecentPopularFamilyMovies = async () => {
  const response = await API.get("/recent-popular-family");
  return response.data;
};
export const getRecentPopularFantasyMovies = async () => {
  const response = await API.get("/recent-popular-fantasy");
  return response.data;
};

export const getRecentPopularHistoryMovies = async () => {
  const response = await API.get("/recent-popular-history");
  return response.data;
};
export const getRecentPopularHorrorMovies = async () => {
  const response = await API.get("/recent-popular-horror");
  return response.data;
};

export const getRecentPopularMusicMovies = async () => {
  const response = await API.get("/recent-popular-music");
  return response.data;
};

export const getRecentPopularMysteryMovies = async () => {
  const response = await API.get("/recent-popular-mystery");
  return response.data;
};

export const getRecentPopularRomanceMovies = async () => {
  const response = await API.get("/recent-popular-romance");
  return response.data;
};
export const getRecentPopularSciFiMovies = async () => {
  const response = await API.get("/recent-popular-sci-fi");
  return response.data;
};

export const getRecentPopularTVMovies = async () => {
  const response = await API.get("/recent-popular-tv-movie");
  return response.data;
};

export const getRecentPopularThrillerMovies = async () => {
  const response = await API.get("/recent-popular-thriller");
  return response.data;
};

export const getRecentPopularWarMovies = async () => {
  const response = await API.get("/recent-popular-war");
  return response.data;
};

export const getRecentPopularWesternMovies = async () => {
  const response = await API.get("/recent-popular-western");
  return response.data;
};
