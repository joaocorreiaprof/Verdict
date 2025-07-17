import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

export const getTrending = async () => {
  const response = await API.get("/trending");
  return response.data;
};
