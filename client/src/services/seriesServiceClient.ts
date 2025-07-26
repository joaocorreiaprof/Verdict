import axios from "axios";

const API = axios.create({
  baseURL: "/api/series",
});

export const getPopular = async () => {
  const response = await API.get("/popular");
  return response.data;
};
