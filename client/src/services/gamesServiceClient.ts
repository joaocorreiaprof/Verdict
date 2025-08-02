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
