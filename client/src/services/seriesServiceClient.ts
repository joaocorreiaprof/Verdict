import axios from "axios";

const API = axios.create({
  baseURL: "/api/series",
});

export const getPopular = async () => {
  const response = await API.get("/popular");
  return response.data;
};

export const getTopRated = async () => {
  const response = await API.get("/top-rated");
  return response.data;
};
