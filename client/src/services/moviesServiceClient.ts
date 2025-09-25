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
