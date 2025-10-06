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
    console.error("Erro ao alternar favorito:", axiosError);
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
    console.error("Erro ao alternar visto:", axiosError);
    throw axiosError.response?.data || axiosError;
  }
}

export async function getTrackedStatus(params: {
  itemId: string;
  itemType: string;
}): Promise<{ seen: boolean; favorite: boolean }> {
  try {
    const response = await axios.get(`${API_URL}/status`, {
      ...getAuthHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar status do item:", error);
    return { seen: false, favorite: false }; // fallback
  }
}
