import axios from "axios";

const API = axios.create({
  baseURL: "/api/games",
});

export const getTopGames = async () => {
  const response = await API.get("/top-games");
  return response.data;
};

export const getNewReleases = async () => {
  const response = await API.get("/new-releases");
  return response.data;
};

export const getUpcomingGames = async () => {
  const response = await API.get("/upcoming-games");
  return response.data;
};

export const getTopRatedGames = async () => {
  const response = await API.get("/top-rated-games");
  return response.data;
};

export const getGamesByYear = async (year: number) => {
  const response = await API.get(`/games-by-year/${year}`);
  return response.data;
};
