import axios, { AxiosError } from "axios";

const API_URL = "/api/tracking";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `${token}` : "",
    },
  };
}

interface ToggleResponse {
  message: string;
  data?: unknown;
}

export async function toggleFavorite(data: {
  itemId: string;
  itemType: string;
}): Promise<ToggleResponse> {
  try {
    const response = await axios.post<ToggleResponse>(
      `${API_URL}/favorites`,
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    console.error("Error toggling favorite:", axiosError);
    throw axiosError.response?.data || axiosError;
  }
}

export async function toggleSeen(data: {
  itemId: string;
  itemType: string;
}): Promise<ToggleResponse> {
  try {
    const response = await axios.post<ToggleResponse>(
      `${API_URL}/seen`,
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    console.error("Error toggling seen:", axiosError);
    throw axiosError.response?.data || axiosError;
  }
}

export async function getTrackedStatus(params: {
  itemId: string;
  itemType: string;
}): Promise<{ seen: boolean; favorite: boolean; toSee: boolean }> {
  try {
    const response = await axios.get(`${API_URL}/status`, {
      ...getAuthHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tracked status:", error);
    return { seen: false, favorite: false, toSee: false }; // fallback updated
  }
}

export async function toggleToSee(data: {
  itemId: string;
  itemType: string;
}): Promise<ToggleResponse> {
  try {
    const response = await axios.post<ToggleResponse>(
      `${API_URL}/to-see`,
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    console.error("Error toggling 'to see':", axiosError);
    throw axiosError.response?.data || axiosError;
  }
}

// New: fetch favorite movies for authenticated user
export async function getFavoriteMovies(): Promise<unknown[]> {
  try {
    const response = await axios.get(
      `${API_URL}/favorites/movies`,
      getAuthHeaders()
    );
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    return [];
  }
}

// New: fetch watchlist (TO_SEE) movies for authenticated user
export async function getWatchlistMovies(): Promise<unknown[]> {
  try {
    const response = await axios.get(
      `${API_URL}/watchlist/movies`,
      getAuthHeaders()
    );
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching watchlist movies:", error);
    return [];
  }
}
