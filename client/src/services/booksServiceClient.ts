import axios from "axios";

const API = axios.create({
  baseURL: "/api/books",
});

export const getTopRated = async () => {
  const response = await API.get("/top-rated");
  return response.data;
};

export const getNewReleases = async () => {
  const response = await API.get("/new-releases");
  return response.data;
};
